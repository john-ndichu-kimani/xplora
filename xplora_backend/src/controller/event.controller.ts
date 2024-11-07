
import { Request, Response } from 'express';
import { EventService } from '../services/event.service';
import { Event } from '../interfaces/event';

const eventService = new EventService();

export class EventController {
 
  // Create an event
  async createEvent(req: Request, res: Response) {
    const new_event: Event = req.body;
    try {
      const response = await eventService.createEvent(new_event)
      if (response.error) {
        return res.status(500).json(response);
      }
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error in createEvent:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Update an event
  async updateEvent(req: Request, res: Response) {
    const eventId: string = req.params.id;
    const new_event: Event = req.body;
    try {
      const response = await eventService.updateEventById(eventId,new_event);
      if (response.error) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in updateEvent:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Fetch all events
  async fetchAllEvents(req: Request, res: Response) {
    try {
      const response = await eventService.fetchAllEvents()
      if (response.error) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in fetchAllEvents:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Soft delete an event
  async softDeleteEvent(req: Request, res: Response) {
    const eventId: string = req.params.id;
    try {
      const response = await eventService.softDeleteEvent(eventId)
      if (response.error) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in softDeleteEvent:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
