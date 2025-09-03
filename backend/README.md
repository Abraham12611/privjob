# PrivJob Backend API

Privacy-first job platform backend with zero-knowledge proof integration using Midnight Network.

## Features

- **Privacy-First**: Candidates prove eligibility without revealing personal information
- **Zero-Knowledge Proofs**: Integration with Midnight Network for ZK proof verification
- **Secure Authentication**: JWT-based auth for employers with role-based access control
- **Ephemeral Contact System**: Time-limited contact requests with automatic cleanup
- **Row Level Security**: Database-level access control with Supabase RLS
- **Rate Limiting**: Built-in protection against abuse
- **API Documentation**: Swagger/OpenAPI documentation in development mode

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Fastify
- **Database**: Supabase (PostgreSQL 17+)
- **Cache**: Redis
- **Blockchain**: Midnight Network
- **Language**: TypeScript
- **Testing**: Vitest
- **Linting**: ESLint + Prettier

## Quick Start

### Prerequisites

- Node.js 20+
- Redis server
- Supabase project

### Installation

```bash
npm install
```

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Fill in your environment variables:
```env
# Server Configuration
PORT=3001
HOST=0.0.0.0
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=your_32_char_encryption_key

# Midnight Network
MIDNIGHT_RPC_URL=your_midnight_rpc_url
MIDNIGHT_PRIVATE_KEY=your_midnight_private_key
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Start with debugging
npm run dev:debug

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

### Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## API Documentation

When running in development mode, API documentation is available at:
- Swagger UI: `http://localhost:3001/docs`

## API Endpoints

### Public Endpoints

- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed health check with dependencies
- `GET /api/v1/jobs` - List public jobs
- `GET /api/v1/jobs/:id` - Get job details
- `GET /api/v1/organizations` - List organizations
- `POST /api/v1/contact/reveal` - Candidate reveals contact info

### Employer Endpoints (Authentication Required)

- `POST /api/v1/employer/jobs` - Create job
- `PUT /api/v1/employer/jobs/:id` - Update job
- `DELETE /api/v1/employer/jobs/:id` - Delete job
- `GET /api/v1/applications` - List applications
- `GET /api/v1/applications/:id` - Get application details
- `POST /api/v1/contact/jobs/:jobId/applications/:applicationId/request` - Request contact

## Database Schema

The backend uses Supabase with the following main tables:

- `organizations` - Company information
- `employer_users` - Employer authentication and profiles
- `jobs` - Job postings with ZK criteria
- `applications` - Application records (read model from blockchain)
- `contact_requests` - Ephemeral contact requests with TTL

All tables have Row Level Security (RLS) policies for data protection.

## Security Features

- **JWT Authentication**: Secure token-based auth for employers
- **Row Level Security**: Database-level access control
- **Rate Limiting**: Protection against API abuse
- **CORS Protection**: Configurable cross-origin policies
- **Helmet Security**: Security headers and CSP
- **Audit Logging**: Comprehensive logging without PII
- **Data Minimization**: Ephemeral data with automatic cleanup

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Architecture

The backend follows a layered architecture:

```
src/
├── config/          # Environment and configuration
├── controllers/     # Request handlers
├── middleware/      # Authentication, validation, error handling
├── routes/          # API route definitions
├── services/        # Business logic and external integrations
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── workers/         # Background workers (indexer)
```

## Integration with Midnight Network

The backend integrates with Midnight Network for zero-knowledge proof verification:

1. **Proof Generation**: Frontend generates ZK proofs using MidnightJS SDK
2. **Proof Submission**: Proofs are submitted to Midnight Network smart contracts
3. **Event Indexing**: Backend indexer listens for blockchain events
4. **Application Updates**: Application status updated based on chain events

## Contact Flow

1. **Application**: Candidate submits ZK proof application on-chain
2. **Interest**: Employer views application and requests contact
3. **Notification**: Candidate receives contact request notification
4. **Reveal**: Candidate chooses to reveal contact information
5. **Access**: Employer gets one-time access token to contact info
6. **Cleanup**: Contact data automatically expires after TTL

## Environment Variables

See `.env.example` for all available configuration options including:

- Server settings (port, host)
- Database connections (Supabase, Redis)
- Security keys (JWT, encryption)
- Midnight Network configuration
- Rate limiting settings
- CORS and logging configuration

## Contributing

1. Follow TypeScript best practices
2. Write tests for new features
3. Use ESLint and Prettier for code formatting
4. Follow the existing architecture patterns
5. Update documentation for API changes

## License

Private - PrivJob Platform
