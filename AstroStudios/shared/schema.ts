import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema remains from the original file
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Game schema
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  genres: text("genres").array().notNull(),
  slug: text("slug").notNull().unique(),
});

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
});

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

// Blog post schema
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  category: text("category").notNull(),
  slug: text("slug").notNull().unique(),
  publishedAt: timestamp("published_at").notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Review schema
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  reviewerName: text("reviewer_name").notNull(),
  reviewerTitle: text("reviewer_title").notNull(),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  gameId: integer("game_id"),
  isIndustry: boolean("is_industry").default(false).notNull(),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
});

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

// Contact message schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Newsletter subscription schema
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  createdAt: true,
});

export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
