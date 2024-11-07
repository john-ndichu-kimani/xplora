import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { extendedRequest } from "../middleware/token.verify";
import { User } from "../interfaces/user";

let service = new AuthService();

export class authController {

  async registerUser(req: Request, res: Response) {
    try {
      const userData: User = req.body;
      const response = await service.registerUser(userData)
      if (response.error) {
        return res.status(400).json(response);
      }
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  
  async loginUser(req: Request, res: Response) {
    try {
      let { email, password } = req.body;

      let response = await service.login(req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async checkDetails(req: extendedRequest, res: Response) {
    try {
      if (req.info) {
        return res.status(201).json({
          info: req.info,
        });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
