import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { Booking } from "../interfaces/booking";

export class BookingService {
  prisma = new PrismaClient({
    log: ["error"],
  });

  // Users to book for an event
  async bookEvent(new_booking: Booking) {
    try {
      const booking_id = uuidv4();

      const response = await this.prisma.booking.create({
        data: {
          id: booking_id,
          userId: new_booking.userId,
          eventId: new_booking.eventId,
          bookingDate: new Date(),
        },
        include: {
          user: true,
          event: true,
        },
      });

      return {
        message: "Event booked successfully",
        booking: response,
      };
    } catch (error) {
      console.error("Error booking event:", error);
      return {
        error: "An error occurred while booking the event",
        details: error,
      };
    }
  }

  // Show booked events for a user
  async fetchBookedEvents(userId: string) {
    try {
      const bookings = await this.prisma.booking.findMany({
        where: {
          userId: userId,
        },
        include: {
          user: true,
          event: true,
        },
      });

      return {
        bookings,
      };
    } catch (error) {
      console.error("Error fetching booked events:", error);
      return {
        error: "An error occurred while fetching booked events",
        details: error,
      };
    }
  }
}
