import { Event } from "../interfaces/event";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

export class EventService {
  prisma = new PrismaClient({
    log: ["error"],
  });

  // Add an event
  async createEvent(new_event: Event) {
    try {
      const event_id = v4();

      const response = await this.prisma.event.create({
        data: {
          id: event_id,
          destination: new_event.destination,
          duration: Number(new_event.duration),
          price: Number(new_event.price),
          type: new_event.type,
          imageUrl:new_event.imageUrl,
          isActive: true, 
          createdAt: new Date(),
          deletedAt:new Date(),
        },
      });

      return {
        message: "Event created successfully",
        event: response,
      };
    } catch (error) {
      console.error("Error creating event:", error);
      return {
        error: "An error occurred while creating the event",
      };
    }
  }

  // Update an event
  async updateEventById(id: string, new_event: Event) {
    try {
      const response = await this.prisma.event.update({
        where: {
          id: id,
        },
        data: {
          destination: new_event.destination,
          duration: new_event.duration,
          price: new_event.price,
          type: new_event.type,
          updatedAt: new Date(),
        },
      });

      return {
        message: "Event updated successfully",
        event: response,
      };
    } catch (error) {
      console.error("Error updating event:", error);
      return {
        error: "An error occurred while updating the event",
      };
    }
  }

  // Display available events
  async fetchAllEvents() {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          isActive: true,
        },
      });

      return {
        events,
      };
    } catch (error) {
      console.error("Error fetching events:", error);
      return {
        error: "An error occurred while fetching events",
      };
    }
  }

  // Soft delete an event
  async softDeleteEvent(id: string) {
    try {
      const response = await this.prisma.event.update({
        where: { id: id },
        data: { isActive: false, deletedAt: new Date() },
      });

      return {
        message: "Event soft-deleted successfully",
        event: response,
      };
    } catch (error) {
      console.error("Error soft-deleting event:", error);
      return {
        error: "An error occurred while soft-deleting the event",
      };
    }
  }
}
