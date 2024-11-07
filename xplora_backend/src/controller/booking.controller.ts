
import { Request, Response } from 'express';
import { BookingService } from '../services/booking.service';
import { Booking } from '../interfaces/booking';


const bookingService = new BookingService();

export class BookingController {
  

  async bookEvent(req: Request, res: Response) {
    const new_booking: Booking = req.body;
    try {
      const response = await bookingService.bookEvent(new_booking)
      if (response.error) {
        return res.status(500).json(response);
      }
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error in bookEvent:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }


  async fetchBookedEvents(req: Request, res: Response) {
    const userId: string = req.params.userId;
    try {
      const response = await bookingService.fetchBookedEvents(userId);
      if (response.error) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in fetchBookedEvents:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
