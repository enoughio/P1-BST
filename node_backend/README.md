# BST Node.js Backend

A Node.js backend application using Express and Prisma, migrated from Django, for the Bharat Storytellers (BST) platform.

## 🚀 Features

- **Express.js** - Fast, unopinionated web framework with ES6 modules
- **Prisma** - Next-generation ORM for Node.js and TypeScript
- **PostgreSQL** - Robust relational database
- **JWT Authentication** - Secure user authentication
- **Role-based Access Control** - Admin, Member, and SuperAdmin roles
- **RESTful API** - Clean and well-structured API endpoints
- **File Upload Support** - Handle avatar and document uploads
- **Input Validation** - Express-validator for request validation
- **Error Handling** - Comprehensive error handling middleware
- **Security** - Helmet, CORS, and rate limiting
- **Payment Integration** - Razorpay payment gateway integration
- **Logging** - Morgan for HTTP request logging

## 📦 Quick Setup

Run the setup script for automated installation:

```bash
chmod +x setup.sh
./setup.sh
```

Or follow the manual installation steps below.

## 🔧 Manual Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd node_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the `.env.local` file with your actual configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/bst_db"
   
   # JWT
   JWT_SECRET="your-super-secure-jwt-secret-key-here"
   
   # Server
   NODE_ENV="development"
   PORT=8000
   
   # Email (for notifications)
   EMAIL_HOST_USER="your-email@gmail.com"
   EMAIL_HOST_PASSWORD="your-app-password"
   
   # File uploads
   MAX_FILE_SIZE=5000000
   UPLOAD_PATH=./uploads
   
   # CORS
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
   
   # Razorpay (optional)
   RAZORPAY_KEY_ID="your-razorpay-key-id"
   RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
   RAZORPAY_WEBHOOK_SECRET="your-razorpay-webhook-secret"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database (for development)
   npm run db:push
   
   # Or run migrations (for production)
   npm run db:migrate
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## 🗄️ Database Schema

The application includes the following main models:

### User Management
- **User** - Base user model with authentication and profile info
- **Member** - Extended user profile for club members with roles
- **Admin** - Administrative users with elevated permissions
- **ExecutiveCommittee** - Executive roles within clubs

### Club Management
- **Club** - Storytelling clubs with location and contact info
- **Initiative** - Club programs and initiatives
- **Membership** - Membership types and pricing

### Events & Meetings
- **Event** - Public events and competitions
- **Meeting** - Regular club meetings with role assignments
- **EventRegistration** - Event signup and participant management
- **Attendance** - Meeting attendance tracking

### Content & Engagement
- **Project** - Club projects and assignments
- **ProjectAssignment** - Member assignments to projects
- **Award** - Recognition and achievements
- **Payment** - Transaction management for events

## 🛠️ API Endpoints

### Authentication (`/api/auth`)
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /me` - Get current user info
- `POST /members/create` - Register new member
- `POST /admins/create` - Register new admin (SuperAdmin only)
- `PUT /change-password` - Change user password

### Users (`/api/users`)
- `GET /` - List all users (Admin only)
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user profile
- `DELETE /:id` - Delete user (Admin only)

### Clubs (`/api/bst/clubs`)
- `GET /` - List all clubs
- `GET /:id` - Get club details
- `POST /` - Create new club (Admin only)
- `PUT /:id` - Update club (Admin only)
- `DELETE /:id` - Delete club (Admin only)

### Members (`/api/bst/members`)
- `GET /` - List members with filtering
- `GET /:id` - Get member details
- `GET /dashboard` - Member dashboard data
- `PUT /:id` - Update member profile
- `POST /request-removal` - Request member removal
- `PUT /request-removal/:id` - Handle removal request (Admin)

### Events (`/api/bst/events`)
- `GET /` - List events with pagination
- `GET /:id` - Get event details
- `POST /` - Create event (Admin only)
- `PUT /:id` - Update event (Admin only)
- `DELETE /:id` - Delete event (Admin only)
- `POST /:id/register` - Register for event
- `DELETE /:id/register` - Cancel event registration

### Meetings (`/api/bst/meetings`)
- `GET /` - List meetings with filtering
- `GET /:id` - Get meeting details
- `POST /` - Create meeting (Admin only)
- `PUT /:id` - Update meeting (Admin only)
- `DELETE /:id` - Delete meeting (Admin only)
- `POST /:id/attendance` - Mark attendance

### Projects (`/api/bst/projects`)
- `GET /` - List projects
- `GET /:id` - Get project details
- `POST /` - Create project (Admin only)
- `PUT /:id` - Update project (Admin only)
- `DELETE /:id` - Delete project (Admin only)
- `POST /:id/assign` - Assign member to project
- `DELETE /:id/assign/:memberId` - Remove member from project

### Awards (`/api/bst/awards`)
- `GET /` - List awards
- `GET /:id` - Get award details
- `POST /` - Create award (Admin only)
- `PUT /:id` - Update award (Admin only)
- `DELETE /:id` - Delete award (Admin only)
- `POST /assign` - Assign award to member

### Initiatives (`/api/bst/initiatives`)
- `GET /` - List initiatives
- `GET /:id` - Get initiative details
- `POST /` - Create initiative (Admin only)
- `PUT /:id` - Update initiative (Admin only)
- `DELETE /:id` - Delete initiative (Admin only)

### Memberships (`/api/bst/membership`)
- `GET /` - List membership types
- `GET /:id` - Get membership details
- `POST /` - Create membership (Admin only)
- `PUT /:id` - Update membership (Admin only)
- `DELETE /:id` - Delete membership (Admin only)
- `POST /assign` - Assign membership to user

### Executive Committee (`/api/bst/executive-committee`)
- `GET /` - List executive members
- `GET /:id` - Get executive member details
- `POST /` - Add member to executive committee (Admin only)
- `PUT /:id` - Update executive member (Admin only)
- `DELETE /:id` - Remove from executive committee (Admin only)
- `GET /club/:clubId` - Get executive committee for club
- `GET /history/:memberId` - Get executive history for member
- `POST /transfer/:id` - Transfer executive role (SuperAdmin only)

### Payments (`/api/payments`)
- `GET /` - List payments (Admin only)
- `GET /:id` - Get payment details (Admin only)
- `POST /` - Create payment record
- `PUT /:id` - Update payment status (Admin only)
- `GET /user/:userId` - Get user payments

### Razorpay (`/api/razorpay`)
- `POST /order/create` - Create Razorpay order
- `POST /order/complete` - Complete payment verification
- `POST /webhook` - Handle Razorpay webhooks
- `GET /payment/:paymentId` - Get payment details (Admin only)
- `POST /refund` - Process refund (Admin only)

## 🔒 Authentication & Authorization (RBAC)

The application implements a comprehensive Role-Based Access Control (RBAC) system with three main user roles:

### 🎭 User Roles & Hierarchy

#### 1. **Member** (Level 1)
- Basic authenticated users
- Can view and update their own profile
- Can register for events
- Can view club information and events
- **Permissions**: Read access to public resources, manage own data

#### 2. **Admin** (Level 2) 
- Club administrators with management capabilities
- All member permissions plus:
- Can manage club members and events
- Can create/update/delete club resources
- Can view payments and registrations
- Can assign projects and awards
- **Permissions**: Full CRUD on club resources, member management

#### 3. **SuperAdmin** (Level 3)
- System administrators with full access
- All admin permissions plus:
- Can manage users across all clubs
- Can create/delete clubs and admin accounts
- Can access all system resources
- Can transfer executive roles
- **Permissions**: Full system access, user management

### 🛡️ Authentication Flow

```
Client Request → JWT Validation → User Role Detection → Permission Check → Access Control
```

1. User registers or logs in via `/api/auth/login`
2. Server validates credentials and returns JWT token
3. Client includes token in `Authorization: Bearer <token>` header
4. Middleware validates token, determines user role, and sets permissions
5. Route-specific authorization checks grant or deny access

### 🔐 Middleware Types

#### Basic Authentication
```javascript
// Requires valid JWT token
app.get('/api/protected', auth, handler);
```

#### Role-Based Protection
```javascript
// Admin or SuperAdmin only
app.post('/api/clubs', auth, adminAuth, handler);

// SuperAdmin only  
app.post('/api/auth/admins/create', auth, superAdminAuth, handler);

// Multiple roles allowed
app.get('/api/members', auth, roleAuth([USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN]), handler);
```

#### Resource Ownership
```javascript
// User can access own resources OR admin can access any
app.get('/api/users/:userId', auth, ownerOrAdminAuth(), handler);

// Club members can access club resources OR admin can access any
app.get('/api/clubs/:clubId/meetings', auth, clubMemberAuth, handler);
```

### 📋 Route Protection Matrix

| Route Category | Member | Admin | SuperAdmin | Notes |
|---------------|--------|-------|------------|-------|
| **Authentication** | ✅ | ✅ | ✅ | Registration, login, profile |
| **View Clubs** | ✅ | ✅ | ✅ | Public information |
| **Manage Clubs** | ❌ | ✅ | ✅ | Create, update, delete |
| **View Events** | ✅ | ✅ | ✅ | Public events |
| **Manage Events** | ❌ | ✅ | ✅ | Create, update, delete |
| **Event Registration** | ✅ | ✅ | ✅ | Register for events |
| **View Members** | 👤 | ✅ | ✅ | Own profile vs all members |
| **Manage Members** | ❌ | ✅ | ✅ | Add, update, remove |
| **View Payments** | 👤 | ✅ | ✅ | Own payments vs all payments |
| **Process Refunds** | ❌ | ❌ | ✅ | SuperAdmin only |
| **User Management** | ❌ | ❌ | ✅ | Create admins, delete users |
| **Executive Committee** | ❌ | ✅ | ✅ | Role transfers: SuperAdmin only |

**Legend**: ✅ = Full Access, ❌ = No Access, 👤 = Own Resources Only

### � Implementation Examples

#### Protected Route Handler
```javascript
// Only admins can create events
router.post('/', [
  auth,                    // Authenticate user
  adminAuth,              // Check admin role
  body('title').isLength({ min: 1 }),
  // ... validation
], async (req, res) => {
  // Handler logic
});
```

#### Resource Ownership Check
```javascript
// Users can update own profile, admins can update any
router.put('/:id', [
  auth,
  ownerOrAdminAuth(),     // Check ownership or admin
  // ... validation  
], async (req, res) => {
  // Handler logic
});
```

#### Multiple Role Access
```javascript
// Both admins and superadmins can manage members
router.get('/', [
  auth,
  roleAuth([USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN]),
], async (req, res) => {
  // Handler logic
});
```

### 📖 Detailed RBAC Documentation

For complete details on the Role-Based Access Control implementation, see [RBAC.md](./RBAC.md) which includes:

- Comprehensive route protection matrix
- Permission system details
- Security considerations
- Testing scenarios
- Migration notes from Django

### 🔐 RBAC Verification

Run the RBAC verification script to check security implementation:

```bash
chmod +x verify-rbac.sh
./verify-rbac.sh
```

## 🏗️ Project Structure

```
src/
├── config/
│   └── database.js         # Prisma client configuration
├── middleware/
│   ├── auth.js            # Authentication middleware
│   ├── errorHandler.js    # Global error handling
│   └── notFound.js        # 404 handler
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── users.js           # User management
│   ├── clubs.js           # Club management
│   ├── members.js         # Member management
│   ├── events.js          # Event management
│   ├── meetings.js        # Meeting management
│   ├── projects.js        # Project management
│   ├── awards.js          # Award management
│   ├── initiatives.js     # Initiative management
│   ├── memberships.js     # Membership management
│   ├── payments.js        # Payment management
│   ├── executive-committee.js  # Executive committee
│   └── razorpay.js        # Razorpay integration
├── uploads/               # File upload storage
└── index.js              # Application entry point

prisma/
├── schema.prisma         # Database schema
└── seed.js              # Database seeding script
```

## 🔧 Development

### Database Management

```bash
# View database in browser
npm run db:studio

# Reset and reseed database
npm run db:migrate && npm run db:seed

# Create new migration
npx prisma migrate dev --name "description"
```

### Environment Variables

The application supports multiple environment files:
- `.env.local` - Local development (git-ignored)
- `.env.example` - Template with example values

### Code Style

- **ES6 Modules** - All files use import/export syntax
- **Async/Await** - Consistent async handling
- **Error Handling** - Comprehensive try-catch blocks
- **Validation** - Input validation on all routes
- **Security** - Built-in security middlewares

## 🚀 Deployment

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Environment variables configured

### Production Setup

1. **Build the application**
   ```bash
   npm ci --production
   npm run db:generate
   ```

2. **Set environment variables**
   ```bash
   export NODE_ENV=production
   export DATABASE_URL="your-production-db-url"
   export JWT_SECRET="your-production-jwt-secret"
   ```

3. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

4. **Start the server**
   ```bash
   npm start
   ```

### Docker Support (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npx prisma generate
EXPOSE 8000
CMD ["npm", "start"]
```

## 📝 Migration from Django

This Node.js backend was migrated from a Django backend with the following key changes:

### Improvements Made
- **ES6 Modules** - Modern JavaScript syntax throughout
- **Better Error Handling** - Consistent error responses
- **Enhanced Validation** - More robust input validation
- **Improved Security** - Additional security middlewares
- **Better Code Organization** - Cleaner separation of concerns
- **Performance** - Optimized database queries with Prisma

### API Compatibility
- All API endpoints maintain the same URLs and response formats
- Authentication flow remains compatible with existing frontend
- Database schema preserved with improvements

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Check database URL and credentials
npx prisma studio
```

**JWT Token Issues**
```bash
# Verify JWT_SECRET is set properly
echo $JWT_SECRET
```

**File Upload Issues**
```bash
# Check upload directory permissions
mkdir -p uploads && chmod 755 uploads
```

### Debug Mode

Set `NODE_ENV=development` for detailed error logs and stack traces.

## � Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [JWT Authentication](https://jwt.io/introduction)
- [Razorpay Integration](https://razorpay.com/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for the Bharat Storytellers community**

1. **Public** - Accessible without authentication
2. **User** - Requires valid JWT token
3. **Admin** - Requires admin role
4. **SuperAdmin** - Requires superuser privileges

## 🧪 Testing the API

After seeding the database, you can test with these credentials:

**Super Admin:**
- Email: `admin@bst.org`
- Password: `admin123`

**Regular Member:**
- Email: `john@example.com`
- Password: `user123`

Use tools like Postman or curl to test the endpoints:

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@bst.org", "password": "admin123"}'

# Get clubs (with auth token)
curl -X GET http://localhost:8000/api/clubs \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📁 Project Structure

```
src/
├── config/
│   └── database.js          # Prisma client configuration
├── middleware/
│   ├── auth.js             # Authentication middleware
│   ├── errorHandler.js     # Global error handling
│   └── notFound.js         # 404 handler
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── clubs.js            # Club management
│   ├── events.js           # Event management
│   ├── members.js          # Member management
│   ├── meetings.js         # Meeting management
│   ├── memberships.js      # Membership types
│   ├── payments.js         # Payment processing
│   ├── projects.js         # Project management
│   └── users.js            # User management
└── index.js                # Main application file

prisma/
├── schema.prisma           # Database schema
└── seed.js                 # Database seeding script
```

## 🔧 Development

### Database Management

```bash
# View database in Prisma Studio
npm run db:studio

# Reset database (development only)
npx prisma db push --force-reset

# Generate new migration
npx prisma migrate dev --name your_migration_name

# Deploy migrations to production
npx prisma migrate deploy
```

### Adding New Features

1. Update the Prisma schema in `prisma/schema.prisma`
2. Run `npm run db:generate` to update the Prisma client
3. Create or update route handlers in `src/routes/`
4. Add appropriate middleware for authentication/validation
5. Test your endpoints

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
PORT=8000
ALLOWED_ORIGINS="https://yourdomain.com"
```

### Deployment Steps

1. Install dependencies: `npm ci`
2. Generate Prisma client: `npm run db:generate`
3. Run database migrations: `npx prisma migrate deploy`
4. Start the application: `npm start`

## 📝 Migration Notes from Django

This Node.js backend replicates the functionality of the original Django backend with the following mappings:

- Django models → Prisma schema models
- Django views → Express route handlers
- Django authentication → JWT-based authentication
- Django admin → API endpoints with admin middleware
- Django ORM → Prisma ORM

Key differences:
- UUIDs used for primary keys where appropriate
- Enum mappings preserved from Django choices
- Foreign key relationships maintained
- Custom ID generation logic replicated

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
