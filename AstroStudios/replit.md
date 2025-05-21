# Astro Studios Game Development Website

## Overview
This is a modern web application for a game development studio called "Astro Studios". The application features a landing page showcasing the studio's games, a blog section, and contact functionality. It's built with React on the frontend and Express on the backend, with a PostgreSQL database managed through Drizzle ORM.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Uses wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query for data fetching and state
- **Internationalization**: i18next for multi-language support (English, Spanish, Portuguese, Russian)
- **Animation**: Framer Motion for smooth UI animations

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database Access**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API endpoints with structured route handlers

### Data Storage
- **Database**: PostgreSQL (via Neon serverless)
- **ORM**: Drizzle for schema definition and database queries
- **Schema**: Defined in `shared/schema.ts` with zod validation

## Key Components

### Frontend Components
1. **Pages**
   - Home page with multiple sections (Hero, About, Games, Blog, Reviews, Contact)
   - Blog listing and individual blog post pages
   - Game detail pages
   - 404 Not Found page

2. **UI Components**
   - Navbar with language selector and responsive design
   - Footer with navigation and social links
   - Comprehensive shadcn/ui component library integration
   - Section components (HeroSection, AboutSection, GamesSection, etc.)

3. **Utilities**
   - i18n translation setup with language detection
   - React Query client configuration
   - Custom hooks for scroll effects, mobile detection, and translations

### Backend Components
1. **Server Setup**
   - Express server with JSON parsing and logging middleware
   - Vite development server integration
   - API route registration

2. **Data Access**
   - Storage interface defined in `server/storage.ts`
   - Memory-based storage implementation for development

3. **API Routes**
   - Games endpoints (/api/games, /api/games/:slug)
   - Blog endpoints (/api/blog, /api/blog/:slug)
   - Contact message and newsletter subscription endpoints

### Shared Components
1. **Database Schema**
   - Users: Authentication information
   - Games: Studio's game portfolio
   - Blog Posts: Content for the blog
   - Reviews: User reviews of games
   - Contact Messages: User inquiries
   - Newsletter Subscriptions: Email subscription management

## Data Flow

1. **Client-Server Communication**
   - Frontend makes requests to API endpoints using React Query
   - Backend processes requests, interacts with the database, and returns JSON responses
   - API responses are cached and managed by React Query

2. **Form Submissions**
   - Contact form and newsletter subscription use React Hook Form with zod validation
   - Form data is sent to respective API endpoints
   - Backend validates input using shared zod schemas before processing

3. **Internationalization**
   - User language preference is detected and stored
   - Content is dynamically loaded based on selected language
   - UI updates with translated text without page reload

## External Dependencies

### Frontend
- React and React DOM for UI rendering
- wouter for client-side routing
- @tanstack/react-query for data fetching and state management
- i18next and react-i18next for internationalization
- framer-motion for animations
- date-fns for date formatting
- shadcn/ui components (built on Radix UI primitives)

### Backend
- Express for HTTP server
- Drizzle ORM for database operations
- Zod for validation
- Nodemailer for email sending (contact form)

## Deployment Strategy
The application is configured for deployment on Replit:

1. **Development Mode**
   - Run with `npm run dev` which starts both the backend server and Vite for frontend development
   - Uses hot module replacement for rapid development

2. **Production Build**
   - Frontend: Vite builds optimized static assets
   - Backend: esbuild bundles the server code
   - Combined build output is placed in the `dist` directory

3. **Production Deployment**
   - Configured for autoscaling deployment on Replit
   - Entry point is `npm run start` which runs the bundled application
   - Port 5000 is mapped to external port 80

4. **Database Integration**
   - PostgreSQL module is included in the Replit configuration
   - Drizzle ORM with schema migrations handles database setup and changes