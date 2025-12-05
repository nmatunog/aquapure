# Backend Setup Instructions

## ✅ Backend Implementation Complete

The NestJS backend has been fully implemented with:

### Modules Created
- ✅ **Prisma Module** - Database connection management
- ✅ **Auth Module** - JWT authentication with login, profile management
- ✅ **Audits Module** - CRUD operations for audits
- ✅ **Metrics Module** - Weekly metrics management

### Database Schema (PostgreSQL 15+ with Prisma)
- ✅ **User** model - Authentication and profiles
- ✅ **Audit** model - Saved audits (Dealer, HOA, Industrial)
- ✅ **WeeklyMetrics** model - Scorecard metrics

### Features Implemented
- ✅ JWT authentication with @nestjs/jwt
- ✅ DTOs with class-validator validation
- ✅ Guards for route protection
- ✅ CORS configuration for frontend
- ✅ Global validation pipe
- ✅ Error handling
- ✅ TypeScript strict mode (no 'any' types)

## Setup Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/aquapure?schema=public"
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. Set Up Database

```bash
# Create database migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### 4. Start Backend Server

```bash
npm run start:dev
```

Backend will run on `http://localhost:3001/api`

## API Endpoints

All endpoints follow RESTful conventions with consistent response format:

### Authentication (`/api/auth`)
- `POST /api/auth/login` - Login (public)
- `GET /api/auth/profile` - Get profile (requires JWT)
- `PUT /api/auth/profile` - Update profile (requires JWT)
- `POST /api/auth/logout` - Logout (requires JWT)

### Audits (`/api/audits`)
- `POST /api/audits` - Create audit (requires JWT)
- `GET /api/audits` - Get all audits (requires JWT)
- `GET /api/audits/:id` - Get audit by ID (requires JWT)

### Metrics (`/api/metrics`)
- `GET /api/metrics/weekly` - Get weekly metrics (requires JWT)
- `PUT /api/metrics/weekly` - Update metric (requires JWT)

## Response Format

All API responses follow this format:

```json
{
  "data": {...},
  "message": "Optional message",
  "success": true
}
```

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run with coverage
npm run test:cov
```

## Production Build

```bash
npm run build
npm run start:prod
```

