# Navbar Example - Full-Stack Next.js Starter

A production-ready Next.js 16 application featuring a sophisticated navigation system with role-based access control, authentication, and modern UI components. While presented as a navbar example, this project is architected as a comprehensive starting point for building scalable web applications.

## Features

### Navigation & UI
- **Responsive Navigation Bar** with mobile and desktop variants
- **Role-Based Menu System** - Dynamic navigation based on user roles (user, moderator, admin)
- **Priority-Based Display** - Intelligent menu item visibility based on viewport size
- **Theme Support** - Dark/light mode with next-themes integration
- **shadcn/ui Components** - Beautiful, accessible UI components built with Radix UI

### Authentication & Authorization
- **Supabase Integration** - Full authentication setup with SSR support
- **Multi-Role System** - Users can have multiple roles simultaneously
- **Role-Based Routing** - Different navigation routes for different user roles
- **Middleware Support** - Authentication middleware utilities included

### Database & Data Layer
- **Drizzle ORM** - Type-safe database access with PostgreSQL
- **Schema Validation** - Zod schemas for runtime validation
- **User Management** - Complete user schema with roles, profiles, and activity tracking
- **Optimized Queries** - Indexed database fields for performance

### Developer Experience
- **TypeScript** - Full type safety across the application
- **Typed Routes** - Next.js typed routes enabled for route safety
- **Path Aliases** - Clean imports with @ aliases
- **Custom Hooks** - Reusable hooks like `use-nav-routes` for role-based navigation
- **Organized Structure** - Clear separation of concerns with config, lib, components, and hooks

## Tech Stack

- **Framework**: Next.js 16 (with React 19)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Supabase Auth
- **Validation**: Zod
- **Type Safety**: TypeScript 5

## Project Structure

```
  app/                    # Next.js app directory
      layout.tsx         # Root layout with providers
      page.tsx           # Home page
  components/
       buttons/           # Reusable button components
       layout/
           navigation/    # Navigation components
       ui/                # shadcn/ui components
  config/                # Configuration files
       navigation.config.ts  # Route definitions by role
       roles.config.ts       # Role configuration
       routes.config.ts      # Route mappings
  db/
       schema.ts          # Database schema
       schemas/
           users.schema.ts   # User table definition
  hooks/                 # Custom React hooks
       use-nav-routes.ts # Navigation route logic
  lib/
       actions/           # Server actions
       queries/           # Database queries
       services/          # Business logic
       supabase/          # Supabase client configuration
       types/             # TypeScript type definitions
       validations/       # Zod schemas
  providers/             # React context providers
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- PostgreSQL database
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd navbar-example
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Create a .env.local file with:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_postgres_connection_string
```

4. Run database migrations:
```bash
pnpm drizzle-kit push
```

5. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Key Concepts

### Role-Based Navigation

The navigation system dynamically adjusts based on user roles:

- **User Role**: Basic access with home dashboard
- **Moderator Role**: Additional moderation tools, reports, and user management
- **Admin Role**: Full access including analytics and system settings

Users can have multiple roles, and the navigation intelligently merges routes from all assigned roles.

### Responsive Design

Navigation items have priority levels (1-4) that control their visibility:

- **md**: Shows priority 1 items
- **lg**: Shows priority 1-2 items
- **xl**: Shows priority 1-3 items
- **2xl**: Shows all items

Lower priority items are accessible via mobile menu on smaller screens.

### Component Architecture

The project demonstrates several architectural patterns:

- **Custom Hooks**: Logic extraction (e.g., `use-nav-routes`)
- **Server/Client Separation**: Proper use of "use client" directives
- **Provider Pattern**: Theme and tooltip providers
- **Compound Components**: Navigation system with composable parts

## Customization

### Adding New Roles

1. Update the role enum in [db/schemas/users.schema.ts](db/schemas/users.schema.ts)
2. Add role configuration in [config/roles.config.ts](config/roles.config.ts)
3. Define role-specific routes in [config/navigation.config.ts](config/navigation.config.ts)

### Adding Navigation Items

Edit [config/navigation.config.ts](config/navigation.config.ts) and add routes to the appropriate array:

```typescript
export const AUTHENTICATED_ROUTES: NavRoute[] = [
  { href: "/new-route" as Route, label: "New Feature", icon: YourIcon, priority: 1 },
];
```

### Styling

- Global styles: [app/globals.css](app/globals.css)
- Theme configuration: [components.json](components.json)
- Tailwind config: Integrated with Tailwind CSS 4

## Why This Makes a Great Starting Point

1. **Production-Ready Architecture**: Properly structured with separation of concerns
2. **Type Safety**: Full TypeScript coverage with Zod validation
3. **Scalable Auth**: Supabase integration with role-based access control
4. **Modern Stack**: Latest Next.js, React, and Tailwind CSS versions
5. **Database Ready**: Drizzle ORM setup with migrations and type-safe queries
6. **Component Library**: shadcn/ui components ready to use and customize
7. **Best Practices**: Server components, proper data fetching, and middleware patterns

## Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is open source and available under the MIT License.
