import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import clubRoutes from './routes/clubs.js';
import eventRoutes from './routes/events.js';
import memberRoutes from './routes/members.js';
import meetingRoutes from './routes/meetings.js';
import projectRoutes from './routes/projects.js';
import membershipRoutes from './routes/memberships.js';
import paymentRoutes from './routes/payments.js';
import awardRoutes from './routes/awards.js';
import initiativeRoutes from './routes/initiatives.js';
import executiveCommitteeRoutes from './routes/executive-committee.js';
import razorpayRoutes from './routes/razorpay.js';

// Import middleware
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import { connectDB } from './config/database.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Static files
app.use('/uploads', express.static('uploads'));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'BST API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/accounts', authRoutes); // Django compatibility
app.use('/api/bst/clubs', clubRoutes);
app.use('/api/bst/events', eventRoutes);
app.use('/api/bst/members', memberRoutes);
app.use('/api/bst/meetings', meetingRoutes);
app.use('/api/bst/projects', projectRoutes);
app.use('/api/bst/membership', membershipRoutes);
app.use('/api/bst/awards', awardRoutes);
app.use('/api/bst/initiatives', initiativeRoutes);
app.use('/api/bst/executive-committee', executiveCommitteeRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/razorpay', razorpayRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Initialize database connection
await connectDB();

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 BST API Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;
