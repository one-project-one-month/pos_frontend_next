This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
pnpm install
```

And, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Project Strucutre

```graphql
POS_NEXTJS/
├── prisma/                 # Prisma folder for database schema and migrations
│   └── schema.prisma       # Define your database schema here
└── src/                    # Source code directory
    ├── components/         # Reusable components
        ├── pages/          # Page Level Components
        ├── ui/             # Shadcn UIs
    ├── db/                 # Database Clients
    ├── hooks/              # Custom hooks
    ├── lib/                # Library files
    ├── providers/          # Context providers
    ├── services/           # API service files
    │   └── api/            # API service folder
    ├── stores/             # Store files
    ├── types/              # Type definitions
    ├── utils/              # Utility files
    └── validations/        # Validation files
```

# Tech Stacks

```
Frontend
  Shadcn UI
  Headless
  Axios
  React Query
  Zustand

Backend
  Prisma
  Posgresql
```
