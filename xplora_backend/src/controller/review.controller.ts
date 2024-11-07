
import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';
import { Review } from '../interfaces/review';

const reviewService = new ReviewService();
export class ReviewController {

  async addReview(req: Request, res: Response) {
    const new_review: Review = req.body;
    try {
      const response = await reviewService.addReview(new_review);
      if (response.error) {
        return res.status(500).json(response);
      }
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error in addReview:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async fetchReviews(req: Request, res: Response) {
    const Id: string = req.params.eventId;
    try {
      const response = await reviewService.fetchReviews(Id);
      if (response.error) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in fetchReviews:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
