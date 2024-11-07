import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { User } from "../interfaces/user";

const userService = new UserService();

export class UserController {
 

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userData: User = req.body;
      const response = await userService.updateUser(id, userData);
      if (response.error) {
        return res.status(400).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const response = await userService.getUsers();
      if (response.error) {
        return res.status(400).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await userService.getUserById(id);
      if (response.error) {
        return res.status(404).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await userService.deleteUserById(id);
      if (response.error) {
        return res.status(400).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
