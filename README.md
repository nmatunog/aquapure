# Aquapure Sales Portal

Full-stack application for consultative selling and reporting system.

## Tech Stack

- **Frontend:** Next.js (App Router) with TypeScript, shadcn/ui, TailwindCSS 4.0+
- **Backend:** NestJS with TypeScript
- **Database:** PostgreSQL 15+ with Prisma ORM
- **Authentication:** JWT tokens with @nestjs/jwt
- **Queue System:** BullMQ with Redis (future)
- **Image Storage:** BunnyCDN (future)
- **Email Service:** Resend (future)
- **Payment Gateway:** Xendit (future)

## Project Structure

```
Aquapure/
├── frontend/          # Next.js frontend application
├── backend/           # NestJS backend application
└── .cursorrules      # Coding standards and guidelines
```

## Quick Start

### Prerequisites

- Node.js 20 LTS or higher
- PostgreSQL 15+ installed and running
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Set up database
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Start development server
npm run start:dev
```

Backend will run on `http://localhost:3001/api`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with backend API URL

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/aquapure?schema=public"
JWT_SECRET=your-super-secret-jwt-key
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Database Schema

- **User:** Authentication and user profiles
- **Audit:** Saved audits (Dealer, HOA, Industrial)
- **WeeklyMetrics:** Scorecard metrics for users

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get user profile (requires JWT)
- `PUT /api/auth/profile` - Update user profile (requires JWT)
- `POST /api/auth/logout` - Logout (requires JWT)

### Audits
- `POST /api/audits` - Save audit (requires JWT)
- `GET /api/audits` - Get all audits for user (requires JWT)
- `GET /api/audits/:id` - Get specific audit (requires JWT)

### Metrics
- `GET /api/metrics/weekly` - Get weekly metrics (requires JWT)
- `PUT /api/metrics/weekly` - Update metric (requires JWT)

## Development

### Backend Commands

```bash
npm run start:dev    # Start in development mode
npm run build        # Build for production
npm run start:prod   # Start production server
npm run test         # Run tests
npm run lint         # Run linter
```

### Frontend Commands

```bash
npm run dev          # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run linter
```

## Coding Standards

This project follows strict coding standards defined in `.cursorrules`:

- ✅ No `any` types - all TypeScript types are explicit
- ✅ API-only communication between frontend and backend
- ✅ PostgreSQL 15+ with Prisma ORM
- ✅ JWT authentication with @nestjs/jwt
- ✅ shadcn/ui components exclusively
- ✅ globals.css color variables (no arbitrary colors)
- ✅ Mobile-first responsive design
- ✅ Complete frontend-backend separation

## License

Private - All rights reserved

