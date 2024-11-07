
import { Router } from 'express';
import { EventController } from '../controller/event.controller';
import { verifyToken } from '../middleware/token.verify';
import { checkRole } from '../middleware/role.check';

const eventController = new EventController();
const event_router = Router();

event_router.post('/create', eventController.createEvent);

event_router.put('/update/:id',eventController.updateEvent);

event_router.get('/all', eventController.fetchAllEvents);

event_router.delete('/delete/:id',eventController.softDeleteEvent);

export default event_router;
