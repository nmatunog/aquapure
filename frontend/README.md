# Aquapure Sales Portal - Frontend

A Next.js application built with TypeScript, shadcn/ui, and TailwindCSS following strict coding standards.

## 🚀 Quick Start

### Prerequisites

- Node.js 20 LTS or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Firebase Setup

The application currently uses Firebase for authentication and data storage. You need to provide Firebase configuration in one of two ways:

#### Option 1: Global Variables (Runtime Injection)

If you're injecting Firebase config via script tags or build-time configuration, ensure these global variables are available:

```javascript
window.__firebase_config = JSON.stringify({
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
})

window.__app_id = "your-app-id"
window.__initial_auth_token = "optional-auth-token"
```

#### Option 2: Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_FIREBASE_CONFIG='{"apiKey":"your-api-key","authDomain":"your-project.firebaseapp.com","projectId":"your-project-id","storageBucket":"your-project.appspot.com","messagingSenderId":"123456789","appId":"your-app-id"}'
NEXT_PUBLIC_APP_ID=default-app-id
NEXT_PUBLIC_INITIAL_AUTH_TOKEN=
```

### Future: Backend API Integration

According to the coding standards, Firebase should eventually be replaced with API calls to the NestJS backend. The code includes TODO comments marking where API integration is needed.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles and color variables
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui base components
│   │   ├── auth/            # Authentication components
│   │   ├── workshop/        # Workshop components
│   │   ├── audit/           # Audit tools
│   │   ├── scorecard/       # Scorecard components
│   │   ├── reports/         # Reports components
│   │   └── layout/          # Layout components
│   ├── types/               # TypeScript type definitions
│   └── lib/                 # Utility functions
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🎨 Design System

- **Components**: shadcn/ui components exclusively
- **Colors**: globals.css variables (automatic dark mode)
- **Styling**: Tailwind utility classes
- **Typography**: System fonts (Geist Sans/Mono can be added)
- **Mobile-First**: Responsive design starting from mobile

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Coding Standards

This project follows strict coding standards defined in `.cursorrules`:

- ✅ No `any` types - all TypeScript types are explicit
- ✅ shadcn/ui components only - no custom UI components
- ✅ globals.css color variables - no arbitrary colors
- ✅ Mobile-first responsive design
- ✅ TypeScript strict mode enabled
- ✅ Next.js App Router conventions

## ⚠️ Known Issues

1. **Firebase Configuration Required**: The app will fail to initialize without Firebase config. See Configuration section above.

2. **Backend API Integration**: Currently uses Firebase directly. Should be migrated to NestJS backend API calls (see TODO comments in code).

## 🔄 Next Steps

1. Set up Firebase configuration (see Configuration section)
2. Replace Firebase calls with API calls to NestJS backend
3. Add form validation with react-hook-form + zod
4. Implement proper error handling and loading states
5. Add environment variable validation

## 📚 Documentation

- [Refactoring Summary](./REFACTORING_SUMMARY.md) - Detailed refactoring changes
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

