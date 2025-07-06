# 🌱 Database Seeding Guide

## Prerequisites

1. **Ensure you have a running PostgreSQL database**
2. **Create a `.env` file** in the `node_backend` directory

## Step 1: Set Up Environment Variables

Create a `.env` file by copying from `.env.example`:

```bash
cd node_backend
cp .env.example .env
```

Edit the `.env` file with your actual database credentials:

```env
# Example for local PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/bst_database"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="24h"
PORT=3000
NODE_ENV="development"
```

## Step 2: Generate Prisma Client

```bash
npm run db:generate
```

## Step 3: Apply Database Migrations

If you haven't already run migrations:

```bash
npm run db:migrate
```

## Step 4: Run the Seed Script

```bash
npm run db:seed
```

## What Gets Created

### 🔐 User Accounts & Roles
- **1 Super Admin**: `admin@bst.org` / `admin123`
- **1 Admin**: `admin.mumbai@bst.org` / `admin456` 
- **3 Members**: 
  - `john@example.com` / `user123`
  - `jane@example.com` / `user123`
  - `alex@example.com` / `user123`

### 🏢 Organizations
- **2 Clubs**: Mumbai Central, Delhi Capitol
- **1 Initiative**: Youth Development Program
- **3 Membership Types**: Basic, Premium, Executive

### 📅 Sample Data
- **3 Awards** with member assignments
- **2 Events** with speakers
- **2 Projects** with member assignments
- **2 Meetings** (Weekly & Executive Committee)
- **Executive Committee** positions
- **Membership History** records

## Verify the Seed

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. **Test login** with any of the provided credentials

3. **Use Prisma Studio** to view the data:
   ```bash
   npm run db:studio
   ```

## Reset Database (if needed)

To clear all data and re-seed:

```bash
# Reset and re-apply migrations
npm run db:migrate -- --reset

# Re-run seed
npm run db:seed
```

## Troubleshooting

### Common Issues:

1. **Connection Error**: Check your `DATABASE_URL` in `.env`
2. **Permission Error**: Ensure your database user has CREATE/DROP privileges
3. **Migration Issues**: Run `npm run db:migrate` first
4. **Module Error**: Run `npm install` to ensure dependencies are installed

### Need Help?

Check the logs for specific error messages. The seed script provides detailed logging for each step.
