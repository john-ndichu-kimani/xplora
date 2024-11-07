import express, { NextFunction, Request, Response } from "express";
import user_router from "./routes/user.router";
import auth_router from "./routes/auth.router";
import { PrismaClient } from '@prisma/client';
import eventRouter from "./routes/event.router";
import event_router from "./routes/event.router";
import booking_router from "./routes/booking.router";
import review_router from "./routes/review.router";
import cors from 'cors'

const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],
  });
  
  async function checkPrismaConnection() {
    try {
      await prisma.$connect();
      console.log('Prisma connected!');
    } catch (error) {
      console.error('Error connecting to Prisma:', error);
    }
  }
  
  checkPrismaConnection(); // Call the function to check the connection
  
  // Graceful shutdown on process termination
  process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
  });
const app = express();



app.use(express.json());

app.use(cors())

// user Routes
app.use('/user', user_router);
app.use('/auth', auth_router);

//event route

  app.use('/event', event_router);

//booking route
app.use('/booking', booking_router)

//review
app.use('/review', review_router);


app.use((error:Error,req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: error.message,
  });
});

const port = 3002;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port} ...`);
});
