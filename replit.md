# Overview

Star Release is a therapeutic web application that provides an interactive experience for emotional release and healing. Users can anonymously write their thoughts and transform them into animated stars in a night sky, creating a visual metaphor for letting go and finding peace. The application combines therapeutic writing with gentle animations, ambient sounds, and affirming messages to create a calming digital sanctuary.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks and custom hooks for local state, TanStack Query for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Animations**: Framer Motion for smooth animations and transitions
- **UI Components**: Radix UI primitives for accessible, unstyled components

## Backend Architecture
- **Server Framework**: Express.js with TypeScript for API endpoints
- **Storage Layer**: Abstracted storage interface with in-memory implementation (MemStorage)
- **Development Server**: Vite middleware integration for hot module replacement
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Request Handling**: Express middleware for JSON parsing, CORS, and request logging

## Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless database for production
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema**: User table with id, username, and password fields
- **Local Storage**: Browser localStorage for persisting daily star counts and positions
- **Session Storage**: PostgreSQL-backed sessions for user authentication

## Authentication and Authorization
- **User Management**: Basic user creation and retrieval through storage interface
- **Session Handling**: Express sessions with PostgreSQL storage
- **Password Storage**: Plain text storage (development setup, needs encryption for production)
- **Anonymous Usage**: Core functionality available without authentication

## Design Patterns
- **Component Composition**: Modular React components with clear separation of concerns
- **Custom Hooks**: Reusable logic for audio controls, star management, and mobile detection
- **Provider Pattern**: Context providers for toast notifications and tooltips
- **Storage Abstraction**: Interface-based storage layer for easy database switching
- **Environment Configuration**: Separate development and production configurations

## Key Features
- **Interactive Writing Area**: Textarea for emotional expression with release animation
- **Star Animation System**: Dynamic star creation and positioning with Framer Motion
- **Audio Controls**: Web Audio API for ambient sounds and release effects
- **Affirmation Modal**: Therapeutic messages displayed after releases
- **Accessibility Features**: High contrast mode, keyboard navigation, screen reader support
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Local Persistence**: Daily star tracking with automatic cleanup of old data

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Connection**: @neondatabase/serverless driver for database connectivity

## UI and Animation Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Framer Motion**: Production-ready motion library for React animations
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel components

## Development Tools
- **Drizzle Kit**: Database migrations and schema management
- **ESBuild**: Fast bundling for production server builds
- **TSX**: TypeScript execution for development server
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

## Form and Validation
- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

## Utility Libraries
- **date-fns**: Modern JavaScript date utility library
- **clsx & tailwind-merge**: Conditional CSS class composition
- **nanoid**: URL-safe unique ID generator
- **class-variance-authority**: Utility for creating variant-based component APIs

## Audio Processing
- **Web Audio API**: Browser-native audio synthesis for ambient sounds
- **Audio Context**: Real-time audio processing for therapeutic soundscapes