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
├── src/prisma/                 # Prisma folder for database schema and migrations
│   └── schema.prisma       # Define your database schema here
├── src/                    # Source code directory
│   ├── components/         # Reusable components
│   │    └── ui/            # Shadcn UI components
│   ├── containers/         # Page level components(Option)
│   ├── utils/              # Utility functions
│   └── app/                # Next.js app folder
│          api/             # API routes folder
│          controllers/     # Controllers folder
└── .env.example            #Example Environment variables

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
