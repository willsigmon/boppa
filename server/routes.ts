import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Save contact message to storage
      const result = await storage.createContactMessage(validatedData);
      
      // Return success response
      res.status(201).json({
        success: true,
        message: "Contact message received successfully",
        data: {
          id: result.id,
          createdAt: result.createdAt
        }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.details
        });
      } else {
        console.error("Error processing contact form:", error);
        res.status(500).json({
          success: false,
          message: "An unexpected error occurred while processing your request"
        });
      }
    }
  });
  
  // Get all contact messages - for admin purposes
  app.get("/api/contact", async (req: Request, res: Response) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.status(200).json({
        success: true,
        data: messages
      });
    } catch (error) {
      console.error("Error retrieving contact messages:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while retrieving contact messages"
      });
    }
  });
  
  // Get a single contact message by ID
  app.get("/api/contact/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid ID format"
        });
      }
      
      const message = await storage.getContactMessageById(id);
      if (!message) {
        return res.status(404).json({
          success: false,
          message: "Contact message not found"
        });
      }
      
      res.status(200).json({
        success: true,
        data: message
      });
    } catch (error) {
      console.error("Error retrieving contact message:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while retrieving the contact message"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
