import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertNewsletterSubscriptionSchema 
} from "@shared/schema";
import nodemailer from 'nodemailer';
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route('/api');
  
  // Games
  app.get('/api/games', async (_req: Request, res: Response) => {
    try {
      const games = await storage.getAllGames();
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch games' });
    }
  });
  
  app.get('/api/games/:slug', async (req: Request, res: Response) => {
    try {
      const game = await storage.getGameBySlug(req.params.slug);
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch game' });
    }
  });
  
  // Blog posts
  app.get('/api/blog', async (_req: Request, res: Response) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog posts' });
    }
  });
  
  app.get('/api/blog/:slug', async (req: Request, res: Response) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog post' });
    }
  });
  
  // Reviews
  app.get('/api/reviews', async (_req: Request, res: Response) => {
    try {
      const reviews = await storage.getAllReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch reviews' });
    }
  });
  
  app.get('/api/reviews/game/:gameId', async (req: Request, res: Response) => {
    try {
      const gameId = parseInt(req.params.gameId);
      if (isNaN(gameId)) {
        return res.status(400).json({ message: 'Invalid game ID' });
      }
      
      const reviews = await storage.getReviewsByGameId(gameId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch reviews' });
    }
  });
  
  // Contact form
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // In a real application, we would send an email here
      // Setup a test transporter for demo purposes
      const testAccount = {
        user: process.env.EMAIL_USER || 'test@example.com',
        pass: process.env.EMAIL_PASS || 'password'
      };
      
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      
      // Simply log the message for now
      console.log(`Contact message received: ${JSON.stringify(validatedData)}`);
      
      res.status(201).json({ 
        message: 'Message sent successfully',
        id: message.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Invalid form data', 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: 'Failed to send message' });
    }
  });
  
  // Newsletter subscription
  app.post('/api/newsletter', async (req: Request, res: Response) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(validatedData);
      
      // In a real application, we would send a confirmation email here
      console.log(`Newsletter subscription: ${validatedData.email}`);
      
      res.status(201).json({ 
        message: 'Subscribed successfully',
        id: subscription.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Invalid email', 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: 'Failed to subscribe' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
