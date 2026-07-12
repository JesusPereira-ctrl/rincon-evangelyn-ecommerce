# El Rincón de Evangelyn

Tienda online para la venta de productos de la región de Los Ríos, Chile. Panel de administración con autenticación, gestión de productos, categorías y órdenes, con pagos integrados vía MercadoPago y notificaciones por email.

## Stack Tecnológico

| Categoría | Tecnología |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Lenguaje | [TypeScript](https://www.typescriptlang.org/) |
| UI | [React 19](https://react.dev/) + [shadcn/ui](https://ui.shadcn.com/) |
| Estilos | [Tailwind CSS v4](https://tailwindcss.com/) |
| Base de datos | [PostgreSQL 17](https://www.postgresql.org/) |
| ORM | [Prisma 7](https://www.prisma.io/) |
| Autenticación | [Supabase Auth](https://supabase.com/auth) |
| Pagos | [MercadoPago SDK](https://www.mercadopago.com.ar/developers) |
| Email | [Resend](https://resend.com/) + [React Email](https://react.email/) |
| State | [Zustand](https://zustand-demo.pmnd.rs/) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |

## Requisitos Previos

- [Node.js](https://nodejs.org/) ≥ 18
- [Docker](https://www.docker.com/) (para PostgreSQL)
- [npm](https://www.npmjs.com/)

## Inicio Rápido

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/mom-ecommerce.git
cd mom-ecommerce
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.template .env
```

Edita el archivo `.env` con tus credenciales. Consulta la sección [Variables de Entorno](#variables-de-entorno) para más detalles.

### 4. Levantar PostgreSQL

```bash
docker compose up -d
```

Esto inicia un contenedor de PostgreSQL 17 en el puerto `5432`.

### 5. Ejecutar migraciones

```bash
npx prisma migrate dev
```

### 6. Iniciar servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

| Script | Comando | Descripción |
|---|---|---|
| `dev` | `npm run dev` | Servidor de desarrollo con hot reload |
| `build` | `npm run build` | Build de producción |
| `start` | `npm run start` | Iniciar servidor en producción |
| `lint` | `npm run lint` | Verificar código con ESLint |
| `email:dev` | `npm run email:dev` | Preview de templates de email (React Email) |

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `DATABASE_URL` | URI de conexión a PostgreSQL | `postgresql://postgres:tu_password@localhost:5432/ecommerce?schema=public` |
| `POSTGRES_PASSWORD` | Password de PostgreSQL (para Docker) | `tu_password` |
| `ACCESS_TOKEN_MERCADO_PAGO` | Token de acceso API MercadoPago | `APP_USR-xxxx-xxxx-xxxx` |
| `RESEND_API_KEY` | API key de Resend para envío de emails | `re_xxxx` |
| `RESEND_FROM_EMAIL` | Email remitente para Resend | `no-reply@turestacion.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clave pública de Supabase | `eyJxxxx` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima de Supabase (middleware) | `eyJxxxx` |
| `SELLER_EMAIL` | Email del vendedor (recibe notificaciones) | `vendedor@email.com` |

> **Nota:** Las variables `NEXT_PUBLIC_*` son visibles en el cliente. No incluyas datos sensibles en ellas.

## Estructura del Proyecto

```
mom-ecommerce/
├── app/                    # App Router (Next.js)
│   ├── (dashboard)/        # Panel de administración
│   │   └── admin/
│   │       ├── login/      # Login admin
│   │       └── dashboard/  # Dashboard (productos, categorías, órdenes)
│   ├── (ecommerce)/        # Tienda pública
│   │   ├── cart/           # Carrito de compras
│   │   ├── checkout/       # Checkout y pago
│   │   └── product/        # Detalle de producto
│   └── api/                # API Routes
│       ├── dashboard/      # API del dashboard
│       ├── email/          # Envío de emails
│       ├── product/        # CRUD productos
│       ├── order/          # CRUD órdenes
│       └── webhook/        # Webhooks (MercadoPago)
├── backend/                # Lógica de negocio
│   ├── repositories/       # Acceso a datos (Prisma)
│   └── services/           # Servicios externos
├── components/             # Componentes UI (shadcn/ui)
├── dashboard/              # Componentes del dashboard
├── emails/                 # Templates de email (React Email)
├── hooks/                  # Custom hooks
├── lib/                    # Clientes de servicios
│   ├── mercadopago/
│   ├── resend/
│   └── supabase/
├── prisma/                 # Schema y migraciones de Prisma
│   ├── migrations/
│   └── schema.prisma
├── public/                 # Assets estáticos
└── theme/                  # Provider de tema
```

## Licencia

Este es un proyecto privado.
