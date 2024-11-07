import { PrismaClient } from "@prisma/client";
import { User, login_details } from "../interfaces/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";
import nodemailer from 'nodemailer';

export class AuthService {
  prisma = new PrismaClient({
    log: ['error'],
  });

  // Register user
  async registerUser(user: User) {
    try {
      // Check if email already exists
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (existingUser) {
        return {
          error: "Email is already registered",
        };
      }

      // Generate user ID and hash the password
      const user_id = uuidv4();
      const hashedPassword = bcrypt.hashSync(user.password, 6);

      const response = await this.prisma.user.create({
        data: {
          id: user_id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          profileImageUrl: user.profileImageUrl || null, // Handle profile image URL
          password: hashedPassword,
        },
      });
      console.log(response);

      if (response?.id === user_id) {
        // Generate JWT token
        const token = jwt.sign({ userId: user_id }, process.env.SECRET_KEY as string, {
          expiresIn: "1h", 
        });
        return {
          message: "Account created successfully",
          token,
        };
      } else {
        return {
          error: "Unable to create account",
        };
      }
    } catch (error) {
      return {
        error: "An error occurred while creating the account",
      };
    }
  }
  // Login service
  async login(logins: login_details) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: logins.email,
        },
        include:{
          bookings:true,
          reviews:true
        }
      });

      if (!user) {
        return {
          error: "User not found",
        };
      } else {
        const hashedPassword = user.password;

        // Compare passwords
        const passwordMatches = bcrypt.compareSync(logins.password, hashedPassword);

        if (passwordMatches) {
          const {password, bookings, reviews, ...rest } = user;

          const token = jwt.sign(rest, process.env.SECRET_KEY as string, {
            expiresIn: process.env.TOKEN_EXPIRATION,
          });

          return {
            message: "Logged in successfully",
            token,
          };
        } else {
          return {
            error: "Incorrect password",
          };
        }
      }
    } catch (error) {
      return {
        error: "An error occurred during login",
      };
    }
  }

  // Request password reset
  async requestPasswordReset(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return { error: "User not found" };
      }

      const resetToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
        expiresIn: '1h',
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
      };

      await transporter.sendMail(mailOptions);

      return { message: "Password reset link sent" };
    } catch (error) {
      return { error: "An error occurred while requesting a password reset" };
    }
  }

  // Reset password
  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded: any = jwt.verify(token, process.env.SECRET_KEY as string);

      const hashedPassword = bcrypt.hashSync(newPassword, 6);

      await this.prisma.user.update({
        where: { id: decoded.id },
        data: { password: hashedPassword },
      });

      return { message: "Password reset successfully" };
    } catch (error) {
      return { error: "Invalid or expired token" };
    }
  }
}
