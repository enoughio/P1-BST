import { PrismaClient } from '../generated/prisma/index.js'


const prisma = new PrismaClient({
    log: process.env.NODE_ENV ? ['query', 'info', 'warn', 'error'] : ['error'],
});

export async function connectDB() {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
}

export async function disconnectDB() {
    await prisma.$disconnect()
    console.log('📴 Database disconnected');
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    await disconnectDB();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await disconnectDB();
    process.exit(0);
});

export default prisma