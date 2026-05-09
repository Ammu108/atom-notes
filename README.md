# Atom Notes

A modern note-taking application built with a monorepo architecture. Features a clean web interface for users and a powerful admin dashboard for management.

---

## 🎯 Overview

Atom Notes is a full-stack TypeScript application designed for secure note management and team collaboration. The project uses a monorepo structure to organize shared packages and multiple applications.

---

## 🏗️ Tech Stack

- **Frontend**: Next.js 14+, React, TypeScript
- **Backend**: tRPC, Next.js API routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based auth with bcryptjs
- **Styling**: Tailwind CSS, shadcn/ui components
- **Package Manager**: pnpm with workspaces
- **Code Quality**: Biome (linting & formatting)

---

## 📂 Project Structure

```
atom-notes/
├── apps/
│   ├── web/              # User-facing web app (port 3000)
│   └── admin/            # Admin dashboard (port 3001)
├── packages/
│   ├── api/              # tRPC API routers
│   ├── auth/             # Authentication logic
│   ├── db/               # Database schema & migrations
│   └── ui/               # Shared UI components
├── package.json          # Workspace root
├── pnpm-workspace.yaml  # Workspace configuration
└── tsconfig.json         # TypeScript config with path aliases
```

### Apps

- **`apps/web`** - Public-facing web application for users to manage notes
- **`apps/admin`** - Admin dashboard for system management and monitoring

### Packages

- **`packages/api`** - tRPC server configuration and API routers
- **`packages/auth`** - Authentication service (signup, login, JWT utilities)
- **`packages/db`** - Drizzle ORM schema, migrations, and database utilities
- **`packages/ui`** - Reusable React components and layouts

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **pnpm** 10+ (or `npm install -g pnpm`)
- **PostgreSQL** database connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd atom-notes
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   - Create `.env` files in `apps/web`, `apps/admin`, and `packages/db`
   - Copy from `.env.example` if available
   - Required: `DATABASE_URL` for PostgreSQL connection

4. **Run database migrations**
   ```bash
   pnpm db:push
   ```

5. **Start development servers**
   ```bash
   pnpm dev
   ```

   - Web app: http://localhost:3000
   - Admin dashboard: http://localhost:3001

---

## 📱 Available Scripts

### Root Workspace Commands

```bash
# Development
pnpm dev              # Start all apps in development mode

# Building & Production
pnpm build            # Build all apps for production
pnpm start            # Start production servers

# Code Quality
pnpm lint             # Run Biome linter
pnpm lint:fix         # Fix linting issues
pnpm format           # Format code with Biome
pnpm check            # Run type checking
pnpm typecheck        # TypeScript compilation check

# Database
pnpm db:generate      # Generate Drizzle types & migrations
pnpm db:migrate       # Run pending migrations
pnpm db:push          # Sync schema with database (dev only)
pnpm db:studio        # Open Drizzle Studio (database GUI)

# Maintenance
pnpm clean            # Remove node_modules and build artifacts
```

---

## 🔧 Development Workflow

### Development Mode

1. Start all services with hot reload:
   ```bash
   pnpm dev
   ```

2. Make changes to any app or package - they update automatically

3. Check code quality:
   ```bash
   pnpm lint:fix        # Auto-fix linting issues
   pnpm typecheck       # Verify TypeScript types
   ```

### Database Changes

When modifying the database schema in `packages/db/src/schema.ts`:

```bash
# 1. Update your schema
# 2. Generate migration
pnpm db:generate

# 3. Review the generated migration file
# 4. Apply to database
pnpm db:push         # Dev only
# or
pnpm db:migrate      # Production migrations
```

---

## 🔐 Authentication

The auth system is in `packages/auth`:

- **Signup**: Create new user accounts with email/password
- **Login**: JWT-based authentication
- **Sessions**: Token-based with expiration
- **Password Security**: bcryptjs hashing

See `packages/auth/src/` for implementation details.

---

## 📦 Shared Packages

### `@repo/api`
tRPC routers and procedures for communication between frontend and backend.

```typescript
// Example usage in apps
import { api } from '@repo/api';
```

### `@repo/auth`
Authentication utilities and services.

```typescript
import { authService } from '@repo/auth';
```

### `@repo/db`
Database queries and schema definitions.

```typescript
import { db } from '@repo/db';
```

### `@repo/ui`
Reusable components and layouts.

```typescript
import { Button, Card } from '@repo/ui';
```

---

## 🐛 Troubleshooting

### Port Already in Use
- Web app uses port 3000, Admin uses port 3001
- Change in `next.config.js` if needed

### Database Connection Failed
- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check firewall/network access

### pnpm Not Installed
```bash
npm install -g pnpm
```

### Dependency Issues
```bash
pnpm clean
pnpm install
```

---

## 📖 Key Files & Directories

- **`pnpm-workspace.yaml`** - Workspace configuration
- **`biome.json`** - Code formatting & linting rules
- **`tsconfig.json`** - TypeScript configuration with `@repo/*` aliases
- **`packages/db/drizzle.config.ts`** - Database configuration
- **`packages/api/src/root.ts`** - Main tRPC router definition

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm lint:fix` and `pnpm check`
4. Test in dev mode with `pnpm dev`
5. Commit and push

---

## 📝 License

This project is private. All rights reserved.

---

## 🆘 Support

For issues or questions:
1. Check this README
2. Review the monorepo structure documentation
3. Check logs in development mode
4. Review package-specific README files (if available)

---

**Happy coding! 🎉**
