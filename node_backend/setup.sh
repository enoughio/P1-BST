#!/bin/bash

# BST Node.js Backend Setup Script

echo "🚀 Setting up BST Node.js Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env.local ]; then
    echo "📋 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your actual environment variables"
else
    echo "✅ .env.local already exists"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Optional: Push database schema (uncomment if needed)
# echo "🗄️ Pushing database schema..."
# npx prisma db push

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your database URL and other environment variables"
echo "2. Run 'npm run db:push' to create the database schema"
echo "3. Run 'npm run db:seed' to seed the database (optional)"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "Happy coding! 🚀"
