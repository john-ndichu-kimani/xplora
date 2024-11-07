
import { Router } from 'express';
import { ReviewController } from '../controller/review.controller';
import { verifyToken } from '../middleware/token.verify';
import { checkRole } from '../middleware/role.check';

const reviewController = new ReviewController();
const review_router = Router();

review_router.post('/create',reviewController.addReview);

review_router.get('/all', reviewController.fetchReviews);

export default review_router;
