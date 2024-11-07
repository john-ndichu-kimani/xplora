import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { Review } from "../interfaces/review";

export class ReviewService {
  prisma = new PrismaClient({
    log: ['error']
  });

  async addReview(new_review: Review) {
    try {
      const review_id = uuidv4();
      const response = await this.prisma.review.create({
        data: {
          id: review_id,
          rating: new_review.rating,
          comment: new_review.comment,
          date: new_review.date,
          user: { connect: { id: new_review.userId } },
          event: { connect: { id: new_review.eventId } },
        },
      });
    
      return {
        message: "Review added successfully",
        review: response,
      };
    } catch (error) {
      console.error("Error adding review:", error);
      return { error: "An error occurred while adding the review" };
    }
  }

  async fetchReviews(eventId: string){
    try {
      const reviews = await this.prisma.review.findMany({
        where: { eventId },
        include: { user: true ,event:true},
        
      });

      return { reviews };
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return { error: "An error occurred while fetching reviews" };
    }
  }
}
