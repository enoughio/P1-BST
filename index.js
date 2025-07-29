import express from 'express';
import helmet from 'helmet'
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';


import { notFound } from './middelwares/not_found.js';
import errorHandler from './middelwares/errorHeandler.js';
import { connectDB } from './config/prismaConfig.js';

// // Import routes
// import authRoutes from './routes/auth.js';
// import userRoutes from './routes/users.js';
// import clubRoutes from './routes/clubs.js';
// import eventRoutes from './routes/events.js';
// import memberRoutes from './routes/members.js';
// import meetingRoutes from './routes/meetings.js';
// import projectRoutes from './routes/projects.js';
// import membershipRoutes from './routes/memberships.js';
// import paymentRoutes from './routes/payments.js';
// import awardRoutes from './routes/awards.js';
// import initiativeRoutes from './routes/initiatives.js';
// import executiveCommitteeRoutes from './routes/executive-committee.js';
// import razorpayRoutes from './routes/razorpay.js';



const app = express();
const PORT = process.env.PORT || 7000;

// security middleware
app.use(helmet());

app.use(express.json());


// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 150 * 60 * 100,   // 
    limit: 1000, // limit each IP to 1000 sec per windowMs 
    message: "Too many API request from this IP, try again later"
})

app.use(limiter)

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

//cookies parser
app.use(cookieParser());

// body parsing middelwarw
app.use(express.json({ limit : '10mb' }))
app.use(express.urlencoded({extended : true, limit: '10mb'}))


// loging middelwares
if ( process.env.NODE_ENV == 'production' ) {
    app.use(morgan('combined'))
} else {
    app.use(morgan('dev'))
}

//static files
app.use('/uploads', express.static('uploads'))


app.get('/', (req, res) => {
    res.send(`Welcome to the backend API! go to http://localhost:${PORT}/health to check the health of the API`);
});


app.get('/health', (req, res) => {
    res.status(400).json({
        message: "server is running fine",
        status : 'OK',
        timestamp : new Date().toISOString()

    })
})


app.use(notFound)
app.use(errorHandler)

// initalizing database connection
await connectDB()

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to access the API`);
});


// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});



