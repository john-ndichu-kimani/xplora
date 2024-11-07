import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { User } from "../interfaces/user";

export class UserService {
  // Initialize Prisma client
  prisma = new PrismaClient({
    log: ["error"],
  });

  

  // Update user info
  async updateUser(id: string, updated_user: User) {
    try {
      // Get current user details
      const current_details = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!current_details) {
        return {
          error: "User not found",
        };
      }

      const response = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: updated_user.name || current_details.name,
          email: updated_user.email || current_details.email,
          mobile: updated_user.mobile || current_details.mobile,
          password: updated_user.password
            ? bcrypt.hashSync(updated_user.password, 6)
            : current_details.password,
          profileImageUrl: updated_user.profileImageUrl || current_details.profileImageUrl,
        },
      });

      return {
        message: "User updated successfully",
        response,
      };
    } catch (error) {
      return {
        error: "An error occurred while updating the user",
      };
    }
  }

  // Get all users
  async getUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return {
        users,
      };
    } catch (error) {
      return {
        error: "An error occurred while fetching users",
      };
    }
  }

  // Get one user by ID
  async getUserById(user_id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: user_id,
        },
      });

      if (!user) {
        return {
          error: "User not found",
        };
      }

      return {
        user,
      };
    } catch (error) {
      return {
        error: "An error occurred while fetching the user",
      };
    }
  }

  // Delete user by ID
  async deleteUserById(user_id: string) {
    try {
      await this.prisma.user.delete({
        where: {
          id: user_id,
        },
      });

      return {
        message: "Account deleted successfully",
      };
    } catch (error) {
      return {
        error: "An error occurred while deleting the account",
      };
    }
  }
}
