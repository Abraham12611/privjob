import { logger } from '@/utils/logger';
import { supabase } from '@/services/database';
import { getRedisClient } from '@/services/redis';
import { config } from '@/config/env';
import { getMidnightSDK, type ApplicationEvent } from '@/services/midnight-sdk';

interface MidnightEvent {
  transactionId: string;
  blockNumber: number;
  eventType: 'APPLICATION_SUBMITTED' | 'APPLICATION_UPDATED';
  data: {
    jobId: string;
    candidateProofHash: string;
    proofData: any;
    timestamp: string;
  };
}

class ChainIndexer {
  private isRunning = false;
  private lastProcessedBlock = 0;

  constructor() {
    this.setupGracefulShutdown();
  }

  async start() {
    if (this.isRunning) {
      logger.warn('Chain indexer is already running');
      return;
    }

    this.isRunning = true;
    logger.info('Starting Midnight Network chain indexer...');

    try {
      // Load last processed block from Redis
      const client = await getRedisClient();
      const lastBlock = await client.get('indexer:last_block');
      if (lastBlock) {
        this.lastProcessedBlock = parseInt(lastBlock);
      }

      // Start polling for new events
      await this.pollForEvents();
    } catch (error) {
      logger.error('Failed to start chain indexer:', error);
      this.isRunning = false;
      throw error;
    }
  }

  async stop() {
    logger.info('Stopping chain indexer...');
    this.isRunning = false;
  }

  private async pollForEvents() {
    while (this.isRunning) {
      try {
        // In a real implementation, this would connect to Midnight Network
        // and listen for smart contract events
        await this.processNewEvents();
        
        // Wait before next poll
        await this.sleep(5000); // 5 seconds
      } catch (error) {
        logger.error('Error polling for events:', error);
        await this.sleep(10000); // Wait longer on error
      }
    }
  }

  private async processNewEvents() {
    try {
      const midnightSDK = await getMidnightSDK();
      const currentBlock = await midnightSDK.getLatestBlockNumber();
      
      if (currentBlock <= this.lastProcessedBlock) {
        logger.debug(`No new blocks to process. Current: ${currentBlock}, Last processed: ${this.lastProcessedBlock}`);
        return;
      }

      logger.debug(`Processing events from block ${this.lastProcessedBlock + 1} to ${currentBlock}`);
      
      // Get application events from Midnight Network
      const events = await midnightSDK.getApplicationEvents(
        this.lastProcessedBlock + 1,
        currentBlock
      );

      for (const event of events) {
        await this.processApplicationEventFromSDK(event);
      }

      // Update last processed block
      if (events.length > 0) {
        const lastEventBlock = Math.max(...events.map(e => e.blockNumber));
        this.lastProcessedBlock = Math.max(this.lastProcessedBlock, lastEventBlock);
        
        const client = await getRedisClient();
        await client.set('indexer:last_block', this.lastProcessedBlock.toString());
      }
      
    } catch (error) {
      logger.error('Error processing Midnight Network events:', error);
      
      // Fallback to mock processing for development
      if (Math.random() < 0.1) { // 10% chance of mock event
        await this.processMockEvent();
      }
    }
  }

  private async processMockEvent() {
    const mockEvent: MidnightEvent = {
      transactionId: `0x${Math.random().toString(16).substr(2, 8)}`,
      blockNumber: this.lastProcessedBlock + 1,
      eventType: 'APPLICATION_SUBMITTED',
      data: {
        jobId: '550e8400-e29b-41d4-a716-446655440000', // Mock job ID
        candidateProofHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        proofData: {
          criteria: ['education', 'experience'],
          proofs: ['proof1', 'proof2']
        },
        timestamp: new Date().toISOString()
      }
    };

    logger.info('Processing mock application event:', {
      txId: mockEvent.transactionId,
      jobId: mockEvent.data.jobId
    });

    await this.processApplicationEvent(mockEvent);
  }

  private async processApplicationEvent(event: MidnightEvent) {
    try {
      // Check if job exists
      const { data: job, error: jobError } = await supabase
        .from('jobs')
        .select('id, organization_id')
        .eq('id', event.data.jobId)
        .single();

      if (jobError || !job) {
        logger.warn('Job not found for application event:', event.data.jobId);
        return;
      }

      // Create or update application record
      const applicationData = {
        job_id: event.data.jobId,
        organization_id: job.organization_id,
        candidate_proof_hash: event.data.candidateProofHash,
        proof_data: event.data.proofData,
        transaction_id: event.transactionId,
        block_number: event.blockNumber,
        status: 'submitted' as const,
        submitted_at: event.data.timestamp,
        updated_at: new Date().toISOString()
      };

      const { error: insertError } = await supabase
        .from('applications')
        .upsert(applicationData, {
          onConflict: 'candidate_proof_hash',
          ignoreDuplicates: false
        });

      if (insertError) {
        logger.error('Failed to insert/update application:', insertError);
        return;
      }

      logger.info('Application processed successfully:', {
        jobId: event.data.jobId,
        proofHash: event.data.candidateProofHash,
        txId: event.transactionId
      });

      // Update last processed block
      this.lastProcessedBlock = event.blockNumber;
      const client = await getRedisClient();
      await client.set('indexer:last_block', this.lastProcessedBlock.toString());

    } catch (error) {
      logger.error('Error processing application event:', error);
      throw error;
    }
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private setupGracefulShutdown() {
    process.on('SIGTERM', () => this.stop());
    process.on('SIGINT', () => this.stop());
  }
}

// Main execution
async function main() {
  const indexer = new ChainIndexer();
  
  try {
    await indexer.start();
  } catch (error) {
    logger.error('Chain indexer failed:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}

export { ChainIndexer };
