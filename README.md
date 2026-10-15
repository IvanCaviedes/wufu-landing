This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Registro de la lista de espera

1. Copia `.env.example` como `.env.local` y completa `SUPABASE_URL` y
   `SUPABASE_SERVICE_ROLE_KEY` con credenciales exclusivas del servidor.
2. Ejecuta en Supabase la migración
   `supabase/migrations/20261015_create_subscribers.sql`.
3. Completa opcionalmente `RESEND_API_KEY` y `RESEND_AUDIENCE_ID` para sincronizar los
   registros con la lista de correo.

La clave `SUPABASE_SERVICE_ROLE_KEY` nunca debe usar el prefijo `NEXT_PUBLIC_` ni enviarse al
navegador. La tabla tiene Row Level Security activado y las escrituras se realizan únicamente desde
`/api/subscribe`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
