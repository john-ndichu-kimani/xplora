
import { Router } from 'express';
import { BookingController } from '../controller/booking.controller';
import { verifyToken } from '../middleware/token.verify';


const bookingController = new BookingController();
const booking_router= Router();

booking_router.post('/add', bookingController.bookEvent)

booking_router.get('/all', bookingController.fetchBookedEvents)

export default booking_router;
