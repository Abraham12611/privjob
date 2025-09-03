import winston from 'winston';
import { loggingConfig } from '@/config/env';

// Create logger instance
const logger = winston.createLogger({
  level: loggingConfig.level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    loggingConfig.format === 'json'
      ? winston.format.json()
      : winston.format.simple()
  ),
  defaultMeta: { service: 'privjob-backend' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Add file transport in production
if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }));
  
  logger.add(new winston.transports.File({
    filename: 'logs/combined.log'
  }));
}

export { logger };
