# Actionable Inbox

A modern task management application built with a monorepo architecture using Next.js, Express, TypeScript, and PostgreSQL.

## Architecture

This project uses a monorepo structure with two main packages:

- **`packages/web`**: Next.js 14+ frontend with App Router and Tailwind CSS
- **`packages/api`**: Express.js backend with TypeScript and Prisma ORM

## Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## Quick Start

1. **Clone and install dependencies:**
   \`\`\`bash
   git clone <repository-url>
   cd actionable-inbox
   npm install
   \`\`\`

2. **Set up the database:**
   \`\`\`bash
   # Copy environment files
   cp packages/api/.env.example packages/api/.env
   cp packages/web/.env.example packages/web/.env.local
   
   # Update DATABASE_URL in packages/api/.env with your PostgreSQL connection string
   # Example: postgresql://username:password@localhost:5432/actionable_inbox
   \`\`\`

3. **Initialize the database:**
   \`\`\`bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   \`\`\`

4. **Start the development servers:**
   \`\`\`bash
   # Start both API and web servers
   npm run dev:api &
   npm run dev:web
   
   # Or start them separately:
   # npm run dev:api    # API server on http://localhost:3001
   # npm run dev:web    # Web server on http://localhost:3000
   \`\`\`

## Available Scripts

### Root Level
- `npm run dev` - Start web development server
- `npm run dev:api` - Start API development server
- `npm run dev:web` - Start web development server
- `npm run build` - Build both packages
- `npm run start` - Start both packages in production mode

### Database Management
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## Project Structure

\`\`\`
actionable-inbox/
├── packages/
│   ├── api/                 # Express.js backend
│   │   ├── src/
│   │   │   └── server.ts    # Main server file
│   │   ├── prisma/
│   │   │   ├── schema.prisma # Database schema
│   │   │   └── seed.ts      # Database seeding
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/                 # Next.js frontend
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   └── globals.css
│       ├── package.json
│       ├── next.config.js
│       └── tailwind.config.js
├── package.json             # Root package.json (workspace)
└── README.md
\`\`\`

## Database Schema

The application includes three main models:

- **User**: User accounts with email and profile information
- **Account**: OAuth account information (for Google authentication)
- **Task**: Tasks with title, description, priority, due dates, and completion status

## API Endpoints

- `GET /health` - Health check
- `GET /api/users` - Get all users
- `GET /api/tasks` - Get tasks (with filtering)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Environment Variables

### API (`packages/api/.env`)
\`\`\`env
DATABASE_URL="postgresql://username:password@localhost:5432/actionable_inbox"
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
\`\`\`

### Web (`packages/web/.env.local`)
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
\`\`\`

## Development

1. **Adding new API endpoints**: Edit `packages/api/src/server.ts`
2. **Database changes**: Update `packages/api/prisma/schema.prisma` and run migrations
3. **Frontend components**: Add to `packages/web/app/` or create a `components/` directory
4. **Styling**: Uses Tailwind CSS with custom design system variables

## Production Deployment

1. **Build the project:**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Set production environment variables**

3. **Deploy database migrations:**
   \`\`\`bash
   npm run db:deploy
   \`\`\`

4. **Start the production servers:**
   \`\`\`bash
   npm run start
   \`\`\`

## Technologies Used

- **Frontend**: Next.js 14+, React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, TypeScript, Prisma ORM
- **Database**: PostgreSQL
- **Development**: tsx, ESLint, Prettier
- **Monorepo**: npm workspaces

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details
