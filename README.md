# Junubi Technologies — Full-Stack Platform

Digital infrastructure website for Junubi Technologies Ltd, Juba, South Sudan.

**Stack:** React + Vite + Tailwind CSS | Node.js + Express | MySQL + Knex | JWT Auth | Docker

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 20+
- MySQL 8.0 (or Docker)

### 1. Clone and set up environment

```bash
git clone <repo-url>
cd junubi-tech

# Backend env
cp backend/.env.example backend/.env
# Edit backend/.env with your DB credentials and secrets
```

### 2. Database setup

```bash
cd backend
npm run migrate     # Run all migrations
npm run seed        # Insert sample data
```

### 3. Start backend

```bash
cd backend
npm run dev         # Starts on http://localhost:4000
```

### 4. Start frontend

```bash
cd frontend
npm run dev         # Starts on http://localhost:5173
```

---

## Docker (All-in-one)

```bash
# Start MySQL + Adminer + backend + frontend
docker-compose up

# Then run migrations inside backend container:
docker-compose exec backend npm run migrate
docker-compose exec backend npm run seed

# Access:
# Frontend:  http://localhost:5173
# Backend:   http://localhost:4000
# Adminer:   http://localhost:8080  (Server: mysql, User: junubi, Pass: junubi_secret)
```

---

## Project Structure

```
junubi-tech/
├── frontend/               React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── api/            Axios client with JWT
│   │   ├── components/
│   │   │   ├── layout/     Navbar, Footer
│   │   │   ├── sections/   NetworkMap (animated SVG)
│   │   │   └── ui/         Button, Card, Badge, Input, Skeleton, EmptyState
│   │   ├── context/        AuthContext (JWT state)
│   │   ├── pages/
│   │   │   ├── admin/      AdminDashboard
│   │   │   └── client/     ClientDashboard
│   │   └── App.jsx         Router
│   ├── Dockerfile          Production (nginx)
│   └── Dockerfile.dev      Development (hot reload)
│
├── backend/                Node.js + Express REST API
│   ├── src/
│   │   ├── config/         db.js, logger.js, email.js
│   │   ├── middleware/     auth.js, errorHandler.js, rateLimiter.js
│   │   ├── routes/         auth.js, public.js, client.js, admin.js
│   │   └── controllers/    authController, publicController, clientController, adminController
│   ├── migrations/         Knex schema migrations (8 tables)
│   ├── seeds/              Sample data
│   ├── Dockerfile
│   └── knexfile.js
│
├── docker-compose.yml      Local dev: MySQL + Adminer + backend + frontend
├── .env.example            All required environment variables
└── README.md
```

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /health | — | Health check |
| POST | /api/auth/register | — | Register client |
| POST | /api/auth/login | — | Login → JWT |
| POST | /api/auth/refresh | — | Refresh token |
| GET | /api/services | — | List services |
| GET | /api/services/:slug | — | Service detail |
| GET | /api/blog | — | Blog posts |
| GET | /api/blog/:slug | — | Blog post |
| POST | /api/contact | — | Contact form |
| POST | /api/quotes | — | Quote request |
| GET | /api/client/services | JWT(client) | Client's services |
| GET | /api/client/invoices | JWT(client) | Client's invoices |
| GET/POST | /api/client/tickets | JWT(client) | Support tickets |
| GET | /api/admin/stats | JWT(admin) | Dashboard stats |
| GET/PATCH | /api/admin/leads/:id | JWT(admin) | Manage leads |
| CRUD | /api/admin/services | JWT(admin) | Manage services |
| CRUD | /api/admin/blog | JWT(admin) | Manage blog |
| GET/PATCH | /api/admin/tickets | JWT(admin) | Manage tickets |

---

## Demo Credentials

> After running seeds:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@junubitech.com | password123 |
| Client | peter.deng@example.com | password123 |

---

## Deployment (Dokploy on DigitalOcean)

Set these environment variables in Dokploy for production:

```
NODE_ENV=production
PORT=4000
FRONTEND_ORIGIN=https://junubitech.com
DB_HOST=<your-db-host>
DB_PORT=3306
DB_USER=<db-user>
DB_PASSWORD=<db-password>
DB_NAME=junubi_tech
JWT_SECRET=<strong-random-secret>
JWT_REFRESH_SECRET=<strong-random-secret>
SMTP_HOST=<smtp-host>
SMTP_PORT=587
SMTP_USER=hello@junubitech.com
SMTP_PASS=<smtp-password>
ADMIN_EMAIL=admin@junubitech.com
```

After deploying: `npm run migrate && npm run seed` (seed only on first deploy).

---

## Frontend Routes

| Route | Page | Protected |
|-------|------|-----------|
| `/` | Home | — |
| `/services` | Services list | — |
| `/services/:slug` | Service detail | — |
| `/about` | About | — |
| `/contact` | Contact form | — |
| `/quote` | Quote request | — |
| `/blog` | Blog listing | — |
| `/blog/:slug` | Blog post | — |
| `/login` | Login/Register | — |
| `/dashboard` | Client portal | JWT(client) |
| `/admin` | Admin panel | JWT(admin) |
