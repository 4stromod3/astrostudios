import { 
  users, type User, type InsertUser,
  games, type Game, type InsertGame,
  blogPosts, type BlogPost, type InsertBlogPost,
  reviews, type Review, type InsertReview,
  contactMessages, type ContactMessage, type InsertContactMessage,
  newsletterSubscriptions, type NewsletterSubscription, type InsertNewsletterSubscription
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Game operations
  getAllGames(): Promise<Game[]>;
  getGameById(id: number): Promise<Game | undefined>;
  getGameBySlug(slug: string): Promise<Game | undefined>;
  createGame(game: InsertGame): Promise<Game>;
  
  // Blog operations
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Review operations
  getAllReviews(): Promise<Review[]>;
  getReviewById(id: number): Promise<Review | undefined>;
  getReviewsByGameId(gameId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Contact message operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Newsletter subscription operations
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private games: Map<number, Game>;
  private blogPosts: Map<number, BlogPost>;
  private reviews: Map<number, Review>;
  private contactMessages: Map<number, ContactMessage>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  
  private userCurrentId: number;
  private gameCurrentId: number;
  private blogPostCurrentId: number;
  private reviewCurrentId: number;
  private contactMessageCurrentId: number;
  private newsletterSubscriptionCurrentId: number;

  constructor() {
    this.users = new Map();
    this.games = new Map();
    this.blogPosts = new Map();
    this.reviews = new Map();
    this.contactMessages = new Map();
    this.newsletterSubscriptions = new Map();
    
    this.userCurrentId = 1;
    this.gameCurrentId = 1;
    this.blogPostCurrentId = 1;
    this.reviewCurrentId = 1;
    this.contactMessageCurrentId = 1;
    this.newsletterSubscriptionCurrentId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Game operations
  async getAllGames(): Promise<Game[]> {
    return Array.from(this.games.values());
  }
  
  async getGameById(id: number): Promise<Game | undefined> {
    return this.games.get(id);
  }
  
  async getGameBySlug(slug: string): Promise<Game | undefined> {
    return Array.from(this.games.values()).find(
      (game) => game.slug === slug,
    );
  }
  
  async createGame(insertGame: InsertGame): Promise<Game> {
    const id = this.gameCurrentId++;
    const game: Game = { ...insertGame, id };
    this.games.set(id, game);
    return game;
  }
  
  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug,
    );
  }
  
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostCurrentId++;
    const blogPost: BlogPost = { ...insertBlogPost, id };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  
  // Review operations
  async getAllReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }
  
  async getReviewById(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }
  
  async getReviewsByGameId(gameId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.gameId === gameId,
    );
  }
  
  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewCurrentId++;
    const review: Review = { 
      ...insertReview, 
      id,
      gameId: insertReview.gameId ?? null,
      isIndustry: insertReview.isIndustry ?? false
    };
    this.reviews.set(id, review);
    return review;
  }
  
  // Contact message operations
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageCurrentId++;
    const contactMessage: ContactMessage = { 
      ...insertContactMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  // Newsletter subscription operations
  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if email already exists
    const existing = Array.from(this.newsletterSubscriptions.values()).find(
      (sub) => sub.email === insertSubscription.email,
    );
    
    if (existing) {
      return existing;
    }
    
    const id = this.newsletterSubscriptionCurrentId++;
    const subscription: NewsletterSubscription = { 
      ...insertSubscription, 
      id, 
      createdAt: new Date() 
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }
  
  // Initialize with sample data
  private initializeData(): void {
    // Sample games
    const sampleGames: InsertGame[] = [
      {
        title: "Once 2",
        description: "A minimalist puzzle experience that challenges your perception of time and space.",
        thumbnailUrl: "https://pixabay.com/get/g731bd148757c52aa43071ffe3f2e6b1da45e12468a478d0535601abebb6834215527964f456f1b01d97cd049d3c1c7ec6b8c591632dc4621411a7a826b569748_1280.jpg",
        genres: ["Puzzle", "Adventure"],
        slug: "once-2"
      },
      {
        title: "Una Noite com Eduado",
        description: "A narrative-driven adventure set during a mysterious night encounter.",
        thumbnailUrl: "https://images.unsplash.com/photo-1610987039121-d70917dcc6f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
        genres: ["Narrative", "Mystery"],
        slug: "una-noite-com-eduado"
      },
      {
        title: "Tap Tap",
        description: "A rhythmic tapping game that tests your timing and reflexes with catchy beats.",
        thumbnailUrl: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
        genres: ["Rhythm", "Arcade"],
        slug: "tap-tap"
      },
      {
        title: "Snappix",
        description: "A photography adventure game where you capture the perfect pixel art moments.",
        thumbnailUrl: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
        genres: ["Photography", "Pixel Art"],
        slug: "snappix"
      },
      {
        title: "The Button Game",
        description: "A deceptively simple game about pressing a button, with unexpected consequences.",
        thumbnailUrl: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
        genres: ["Experimental", "Puzzle"],
        slug: "the-button-game"
      }
    ];
    
    // Add sample games
    sampleGames.forEach(game => {
      this.createGame(game);
    });
    
    // Sample blog posts
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "New Levels Coming to Once 2",
        content: "<p>We're excited to announce that we're working on a new expansion for Once 2, featuring 10 challenging new levels.</p><p>These levels will introduce new mechanics that will challenge even the most experienced players. We've been listening to your feedback and are implementing many of the most requested features.</p><p>Stay tuned for more updates in the coming weeks!</p>",
        summary: "We're excited to announce that we're working on a new expansion for Once 2, featuring 10 challenging new levels.",
        thumbnailUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
        category: "Development",
        slug: "new-levels-once-2",
        publishedAt: new Date("2023-07-15")
      },
      {
        title: "The Story Behind Una Noite com Eduado",
        content: "<p>Learn about the creative process and inspiration that led to our narrative adventure game.</p><p>Una Noite com Eduado was inspired by Latin American magical realism and the works of authors like Gabriel García Márquez and Jorge Luis Borges. The game takes place during a single night, but explores themes of time, memory, and identity.</p><p>The protagonist's journey is a metaphor for self-discovery, with each encounter representing different aspects of the human experience.</p>",
        summary: "Learn about the creative process and inspiration that led to our narrative adventure game.",
        thumbnailUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
        category: "Behind the Scenes",
        slug: "story-behind-una-noite",
        publishedAt: new Date("2023-06-28")
      },
      {
        title: "Snappix Coming to Mobile Devices",
        content: "<p>We're thrilled to announce that Snappix will be available on iOS and Android next month.</p><p>The mobile version will include all the features of the desktop release, plus some exclusive content for mobile players. We've completely redesigned the interface to work seamlessly with touch controls.</p><p>The game will be priced at $4.99 with no in-app purchases or advertisements, providing a premium experience for all players.</p>",
        summary: "We're thrilled to announce that Snappix will be available on iOS and Android next month.",
        thumbnailUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
        category: "Announcement",
        slug: "snappix-mobile-release",
        publishedAt: new Date("2023-05-10")
      }
    ];
    
    // Add sample blog posts
    sampleBlogPosts.forEach(post => {
      this.createBlogPost(post);
    });
    
    // Sample reviews
    const sampleReviews: InsertReview[] = [
      {
        reviewerName: "Jamie Smith",
        reviewerTitle: "Once 2 Player",
        rating: 5,
        content: "Once 2 completely blew my mind. The minimalist design paired with complex puzzles creates an amazing gaming experience.",
        gameId: 1,
        isIndustry: false
      },
      {
        reviewerName: "Alex Rodriguez",
        reviewerTitle: "Adventure Game Fan",
        rating: 4,
        content: "Una Noite com Eduado tells a haunting story in such a unique way. I couldn't stop playing until I reached the end.",
        gameId: 2,
        isIndustry: false
      },
      {
        reviewerName: "Lisa Kwon",
        reviewerTitle: "Mobile Gamer",
        rating: 5,
        content: "Tap Tap is my go-to game when I need a quick break. Simple, addictive, and surprisingly challenging!",
        gameId: 3,
        isIndustry: false
      },
      {
        reviewerName: "Miguel Patel",
        reviewerTitle: "Digital Artist",
        rating: 4,
        content: "Snappix rekindled my love for pixel art. The gameplay mechanics are refreshing and the visuals are charming.",
        gameId: 4,
        isIndustry: false
      },
      {
        reviewerName: "Tara Johnson",
        reviewerTitle: "Puzzle Enthusiast",
        rating: 5,
        content: "The Button Game is genius in its simplicity. What seems straightforward quickly becomes a mind-bending experience.",
        gameId: 5,
        isIndustry: false
      },
      {
        reviewerName: "GameDev Magazine",
        reviewerTitle: "Industry Publication",
        rating: 5,
        content: "Astro Studios continues to impress with their innovative approach to game design and storytelling.",
        gameId: null,
        isIndustry: true
      }
    ];
    
    // Add sample reviews
    sampleReviews.forEach(review => {
      this.createReview(review);
    });
  }
}

export const storage = new MemStorage();
