# Overview

This is a service website for professional 2GIS navigation app installation in Ukraine. The application offers three installation methods (offline, online, and APK) with multi-language support (Russian/Ukrainian). It's built as a full-stack web application with a React frontend and Express backend, featuring a modern UI with shadcn/ui components and a PostgreSQL database setup.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite build system
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and dark theme
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and caching
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: Hot reload via Vite integration in development mode
- **API Structure**: RESTful API with /api prefix routing
- **Error Handling**: Centralized error middleware with status code mapping
- **Logging**: Request/response logging with duration tracking

## Data Storage
- **Database**: PostgreSQL with Neon Database serverless connection
- **ORM**: Drizzle ORM with TypeScript-first schema definitions
- **Migrations**: Drizzle Kit for schema migrations and database management
- **Schema Validation**: Drizzle-Zod integration for runtime type validation
- **Session Storage**: In-memory storage with extensible IStorage interface pattern

## Authentication & Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Model**: Basic username/password authentication schema
- **Storage Pattern**: Abstracted storage interface supporting both memory and database implementations

## External Dependencies
- **Database**: Neon Database (@neondatabase/serverless) for PostgreSQL hosting
- **UI Components**: Comprehensive Radix UI component library for accessibility
- **Development**: Replit-specific plugins for development environment integration
- **Build Tools**: esbuild for server bundling, Vite for client bundling
- **Styling**: PostCSS with autoprefixer for CSS processing