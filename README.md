# Next.js Project Starter

Welcome to your Next.js project, bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To get started with development, follow these steps:

1. Install dependencies using npm, yarn, pnpm, or bun:

```bash
npm ci
```

2. Generate and migrate the Prisma client:

```bash
npx prisma generate
npx prisma migrate dev --name init 
```

3. Start the main app:

```bash
npm run dev
```

4. Start the WebSocket server:

```bash
npm run server
```

5. Set up the PostgreSQL Docker instance:

```bash
docker-compose up
```

Once everything is set up, navigate to [http://localhost:3000/login](http://localhost:3000/login) in your browser to see the result. The page will auto-update as you make changes to your code.

## Key Features

- **Font Optimization**: This project automatically optimizes and loads the Inter font, a custom Google Font, using [`next/font`](https://nextjs.org/docs/basic-features/font-optimization).

## Learn More

Explore more about Next.js with these resources:

- [Next.js Documentation](https://nextjs.org/docs): Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn): An interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js/): Your feedback and contributions are welcome!

## Deployment

Deploy your Next.js app easily on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
