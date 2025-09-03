import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseConfig } from '@/config/env';
import { logger } from '@/utils/logger';

// Create Supabase client for API operations (with anon key)
export const supabase: SupabaseClient = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Create Supabase client for admin operations (with service key)
export const supabaseAdmin: SupabaseClient = createClient(
  supabaseConfig.url,
  supabaseConfig.serviceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Database connection health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('organizations')
      .select('count')
      .limit(1);
    
    if (error) {
      logger.error('Database health check failed:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    logger.error('Database connection error:', error);
    return false;
  }
}

// Database types for better type safety
export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          website: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      employer_users: {
        Row: {
          id: string;
          organization_id: string;
          email: string;
          role: 'admin' | 'recruiter' | 'viewer';
          created_at: string;
          last_login_at: string | null;
        };
        Insert: {
          id?: string;
          organization_id: string;
          email: string;
          role: 'admin' | 'recruiter' | 'viewer';
          created_at?: string;
          last_login_at?: string | null;
        };
        Update: {
          id?: string;
          organization_id?: string;
          email?: string;
          role?: 'admin' | 'recruiter' | 'viewer';
          created_at?: string;
          last_login_at?: string | null;
        };
      };
      jobs: {
        Row: {
          id: string;
          organization_id: string;
          title: string;
          description: string | null;
          type: 'Full Time' | 'Part Time' | 'Contract' | 'Freelance';
          workplace: 'Remote' | 'Hybrid' | 'Onsite';
          location: string;
          seniority: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Head';
          salary_min: number | null;
          salary_max: number | null;
          salary_currency: string;
          status: 'Open' | 'Closed' | 'Draft';
          criteria: any; // JSONB
          tags: string[];
          responsibilities: string[];
          benefits: string[];
          posted_at: string;
          updated_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          title: string;
          description?: string | null;
          type: 'Full Time' | 'Part Time' | 'Contract' | 'Freelance';
          workplace: 'Remote' | 'Hybrid' | 'Onsite';
          location: string;
          seniority: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Head';
          salary_min?: number | null;
          salary_max?: number | null;
          salary_currency?: string;
          status?: 'Open' | 'Closed' | 'Draft';
          criteria?: any;
          tags?: string[];
          responsibilities?: string[];
          benefits?: string[];
          posted_at?: string;
          updated_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          title?: string;
          description?: string | null;
          type?: 'Full Time' | 'Part Time' | 'Contract' | 'Freelance';
          workplace?: 'Remote' | 'Hybrid' | 'Onsite';
          location?: string;
          seniority?: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Head';
          salary_min?: number | null;
          salary_max?: number | null;
          salary_currency?: string;
          status?: 'Open' | 'Closed' | 'Draft';
          criteria?: any;
          tags?: string[];
          responsibilities?: string[];
          benefits?: string[];
          posted_at?: string;
          updated_at?: string;
          created_by?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          job_id: string;
          tx_hash: string;
          commitment_hash: string;
          verdict: boolean;
          criteria_results: any; // JSONB
          submitted_at: string;
          indexed_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          tx_hash: string;
          commitment_hash: string;
          verdict: boolean;
          criteria_results?: any;
          submitted_at: string;
          indexed_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          tx_hash?: string;
          commitment_hash?: string;
          verdict?: boolean;
          criteria_results?: any;
          submitted_at?: string;
          indexed_at?: string;
        };
      };
      contact_requests: {
        Row: {
          id: string;
          job_id: string;
          application_id: string;
          status: 'pending' | 'requested' | 'accepted' | 'declined' | 'expired' | 'revealed' | 'consumed';
          message: string | null;
          one_time_token: string | null;
          channel: 'privInbox' | 'email' | null;
          created_at: string;
          expires_at: string;
          revealed_at: string | null;
        };
        Insert: {
          id?: string;
          job_id: string;
          application_id: string;
          status?: 'pending' | 'requested' | 'accepted' | 'declined' | 'expired' | 'revealed' | 'consumed';
          message?: string | null;
          one_time_token?: string | null;
          channel?: 'privInbox' | 'email' | null;
          created_at?: string;
          expires_at?: string;
          revealed_at?: string | null;
        };
        Update: {
          id?: string;
          job_id?: string;
          application_id?: string;
          status?: 'pending' | 'requested' | 'accepted' | 'declined' | 'expired' | 'revealed' | 'consumed';
          message?: string | null;
          one_time_token?: string | null;
          channel?: 'privInbox' | 'email' | null;
          created_at?: string;
          expires_at?: string;
          revealed_at?: string | null;
        };
      };
      webhooks: {
        Row: {
          id: string;
          organization_id: string;
          url: string;
          secret: string;
          events: string[];
          active: boolean;
          created_at: string;
          last_triggered_at: string | null;
        };
        Insert: {
          id?: string;
          organization_id: string;
          url: string;
          secret: string;
          events?: string[];
          active?: boolean;
          created_at?: string;
          last_triggered_at?: string | null;
        };
        Update: {
          id?: string;
          organization_id?: string;
          url?: string;
          secret?: string;
          events?: string[];
          active?: boolean;
          created_at?: string;
          last_triggered_at?: string | null;
        };
      };
    };
  };
}
