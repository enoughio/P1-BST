#!/bin/bash

# BST Node.js Backend Verification Script

echo "🔍 Verifying BST Node.js Backend setup..."

# Check for required files
echo "📋 Checking required files..."

required_files=(
    "package.json"
    "prisma/schema.prisma"
    "src/index.js"
    "src/config/database.js"
    ".env.example"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
    fi
done

# Check route files
echo ""
echo "🛣️  Checking route files..."

route_files=(
    "src/routes/auth.js"
    "src/routes/users.js"
    "src/routes/clubs.js"
    "src/routes/members.js"
    "src/routes/events.js"
    "src/routes/meetings.js"
    "src/routes/projects.js"
    "src/routes/awards.js"
    "src/routes/initiatives.js"
    "src/routes/memberships.js"
    "src/routes/payments.js"
    "src/routes/executive-committee.js"
    "src/routes/razorpay.js"
)

for file in "${route_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
    fi
done

# Check middleware files
echo ""
echo "🛡️  Checking middleware files..."

middleware_files=(
    "src/middleware/auth.js"
    "src/middleware/errorHandler.js"
    "src/middleware/notFound.js"
)

for file in "${middleware_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
    fi
done

# Check if using ES6 imports
echo ""
echo "🔧 Checking for ES6 module usage..."

if grep -r "module.exports" src/ >/dev/null 2>&1; then
    echo "❌ Found CommonJS exports (module.exports) in src/"
else
    echo "✅ All files using ES6 exports"
fi

if grep -r "require(" src/ >/dev/null 2>&1; then
    echo "❌ Found CommonJS requires in src/"
else
    echo "✅ All files using ES6 imports"
fi

# Check package.json for type: module
echo ""
echo "📦 Checking package.json configuration..."

if grep -q '"type": "module"' package.json; then
    echo "✅ ES6 modules enabled in package.json"
else
    echo "❌ ES6 modules not enabled in package.json"
fi

# Check for environment file
echo ""
echo "🌍 Checking environment configuration..."

if [ -f ".env.local" ]; then
    echo "✅ .env.local exists"
elif [ -f ".env" ]; then
    echo "⚠️  .env exists (consider using .env.local for development)"
else
    echo "❌ No environment file found. Copy .env.example to .env.local"
fi

echo ""
echo "🏁 Verification completed!"
echo ""
echo "Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Set up environment: cp .env.example .env.local"
echo "3. Configure database URL in .env.local"
echo "4. Generate Prisma client: npm run db:generate"
echo "5. Push schema to database: npm run db:push"
echo "6. Start development server: npm run dev"
