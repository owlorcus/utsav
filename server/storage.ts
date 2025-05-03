import { users, events, categories, bookings, testimonials } from "@shared/schema";
import type { 
  User, InsertUser, 
  Event, InsertEvent,
  Category, InsertCategory,
  Booking, InsertBooking,
  Testimonial, InsertTestimonial
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

export interface IStorage {
  // Session store
  sessionStore: any; // Using any for session store type to avoid typescript issues
  
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;

  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Event methods
  getAllEvents(): Promise<Event[]>;
  getFeaturedEvents(): Promise<Event[]>;
  getUpcomingEvents(limit?: number): Promise<Event[]>;
  getEventsByCategory(categoryId: number): Promise<Event[]>;
  getEventById(id: number): Promise<Event | undefined>;
  searchEvents(query: string, categoryId?: number, location?: string): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;

  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getBookingsByEvent(eventId: number): Promise<Booking[]>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;

  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private events: Map<number, Event>;
  private bookings: Map<number, Booking>;
  private testimonials: Map<number, Testimonial>;
  
  private userIdCounter: number;
  private categoryIdCounter: number;
  private eventIdCounter: number;
  private bookingIdCounter: number;
  private testimonialIdCounter: number;
  
  public sessionStore: any; // Using any for session store type to avoid typescript issues

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.events = new Map();
    this.bookings = new Map();
    this.testimonials = new Map();
    
    this.userIdCounter = 1;
    this.categoryIdCounter = 1;
    this.eventIdCounter = 1;
    this.bookingIdCounter = 1;
    this.testimonialIdCounter = 1;
    
    // Create memory store for sessions
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });

    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Add default categories
    const defaultCategories: InsertCategory[] = [
      { name: "Wedding", icon: "ri-cake-3-line", slug: "wedding" },
      { name: "Corporate", icon: "ri-building-line", slug: "corporate" },
      { name: "Festival", icon: "ri-fire-line", slug: "festival" },
      { name: "Cultural", icon: "ri-music-2-line", slug: "cultural" },
      { name: "Religious", icon: "ri-heart-line", slug: "religious" },
      { name: "Traditional", icon: "ri-government-line", slug: "traditional" },
      { name: "Social", icon: "ri-group-line", slug: "social" }
    ];

    defaultCategories.forEach(category => this.createCategory(category));

    // Add default testimonials
    const defaultTestimonials: InsertTestimonial[] = [
      {
        name: "Priya Sharma",
        position: "Wedding Planner, Delhi",
        content: "Evexa made planning our traditional wedding so much easier. The vendor connections and planning tools saved us countless hours of work.",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        name: "Raj Mehta",
        position: "Event Manager, Mumbai",
        content: "Our corporate event was a massive success thanks to Evexa's platform. The registration process was seamless and the analytics helped us track attendance.",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Ananya Patel",
        position: "Festival Organizer, Bangalore",
        content: "As a festival organizer, I've used many platforms, but Evexa stands out with its India-focused features. The cultural calendar integration is particularly helpful.",
        rating: 4,
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
      }
    ];

    defaultTestimonials.forEach(testimonial => this.createTestimonial(testimonial));

    // Create a default admin user
    this.createUser({
      username: "admin",
      password: "password123",
      name: "Admin User",
      email: "admin@evexaevents.in",
      phone: "+91-9876543210",
      bio: "Platform administrator",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    });

    // Create sample events
    const now = new Date();
    const sampleEvents: InsertEvent[] = [
      {
        title: "Diwali Celebration 2023",
        description: "Join us for the grand Diwali celebration with stunning light displays, traditional music, and delicious food.",
        image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        location: "Delhi",
        address: "123 Festival Street, New Delhi, 110001",
        startDate: new Date(now.getFullYear(), 10, 12),
        endDate: new Date(now.getFullYear(), 10, 12),
        startTime: "18:00",
        endTime: "23:00",
        isFeatured: true,
        categoryId: 3, // Festival category
        organizerId: 1, // Admin user
        capacity: 500,
        price: 0
      },
      {
        title: "India Tech Summit 2023",
        description: "The largest technology conference in India featuring keynotes from industry leaders and networking opportunities.",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        location: "Bangalore",
        address: "Tech Park, Electronic City, Bangalore, 560100",
        startDate: new Date(now.getFullYear(), 9, 15),
        endDate: new Date(now.getFullYear(), 9, 17),
        startTime: "09:00",
        endTime: "18:00",
        isFeatured: true,
        categoryId: 2, // Corporate category
        organizerId: 1, // Admin user
        capacity: 1000,
        price: 1500
      },
      {
        title: "Wedding Planning Expo",
        description: "Everything you need for your dream Indian wedding under one roof. Meet top vendors, designers, and planners.",
        image: "https://images.unsplash.com/photo-1517035753523-bd3dc5e49d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        location: "Mumbai",
        address: "Grand Expo Center, Bandra, Mumbai, 400050",
        startDate: new Date(now.getFullYear(), 11, 8),
        endDate: new Date(now.getFullYear(), 11, 10),
        startTime: "10:00",
        endTime: "20:00",
        isFeatured: true,
        categoryId: 1, // Wedding category
        organizerId: 1, // Admin user
        capacity: 2000,
        price: 500
      },
      {
        title: "Holi Color Festival",
        description: "Celebrate the festival of colors with music, dance, and traditional Holi festivities.",
        image: "https://images.unsplash.com/photo-1599732494971-c0e8069569b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        location: "Kolkata",
        address: "City Park, Park Street, Kolkata, 700016",
        startDate: new Date(now.getFullYear() + 1, 2, 8),
        startTime: "10:00",
        endTime: "16:00",
        isFeatured: false,
        categoryId: 3, // Festival category
        organizerId: 1, // Admin user
        capacity: 1000,
        price: 200
      },
      {
        title: "Yoga & Meditation Retreat",
        description: "Rejuvenate your mind, body, and soul with a week-long yoga and meditation retreat in the serene mountains of Rishikesh.",
        image: "https://images.unsplash.com/photo-1488861859915-4b5a5e57a9e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        location: "Rishikesh",
        address: "Himalayan Retreat Center, Rishikesh, Uttarakhand, 249201",
        startDate: new Date(now.getFullYear(), 9, 20),
        endDate: new Date(now.getFullYear(), 9, 25),
        startTime: "06:00",
        endTime: "19:00",
        isFeatured: false,
        categoryId: 7, // Social category
        organizerId: 1, // Admin user
        capacity: 50,
        price: 15000
      },
      {
        title: "Navratri Garba Night",
        description: "Experience the excitement of Navratri with traditional Garba and Dandiya Raas celebrations.",
        image: "https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        location: "Ahmedabad",
        address: "Garba Ground, Navrangpura, Ahmedabad, Gujarat, 380009",
        startDate: new Date(now.getFullYear(), 9, 15),
        startTime: "20:00",
        endTime: "02:00",
        isFeatured: false,
        categoryId: 4, // Cultural category
        organizerId: 1, // Admin user
        capacity: 2000,
        price: 300
      },
      {
        title: "Indian Cuisine Festival",
        description: "Taste the diverse flavors of Indian cuisine from various regions, presented by top chefs and food experts.",
        image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        location: "Hyderabad",
        address: "Food Court, Jubilee Hills, Hyderabad, Telangana, 500033",
        startDate: new Date(now.getFullYear(), 10, 5),
        endDate: new Date(now.getFullYear(), 10, 7),
        startTime: "12:00",
        endTime: "22:00",
        isFeatured: false,
        categoryId: 7, // Social category
        organizerId: 1, // Admin user
        capacity: 1500,
        price: 750
      }
    ];

    sampleEvents.forEach(event => this.createEvent(event));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date();
    const newUser: User = { ...user, id, createdAt };
    this.users.set(id, newUser);
    return newUser;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const newCategory: Category = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  // Event methods
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getFeaturedEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      (event) => event.isFeatured,
    );
  }

  async getUpcomingEvents(limit?: number): Promise<Event[]> {
    const now = new Date();
    let upcomingEvents = Array.from(this.events.values()).filter(
      (event) => new Date(event.startDate) >= now,
    ).sort((a, b) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
    
    if (limit) {
      upcomingEvents = upcomingEvents.slice(0, limit);
    }
    
    return upcomingEvents;
  }

  async getEventsByCategory(categoryId: number): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      (event) => event.categoryId === categoryId,
    );
  }

  async getEventById(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async searchEvents(query: string, categoryId?: number, location?: string): Promise<Event[]> {
    let filteredEvents = Array.from(this.events.values());
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredEvents = filteredEvents.filter(
        (event) => 
          event.title.toLowerCase().includes(lowerQuery) || 
          event.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    if (categoryId) {
      filteredEvents = filteredEvents.filter(
        (event) => event.categoryId === categoryId
      );
    }
    
    if (location) {
      filteredEvents = filteredEvents.filter(
        (event) => event.location.toLowerCase() === location.toLowerCase()
      );
    }
    
    return filteredEvents;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.eventIdCounter++;
    const createdAt = new Date();
    const newEvent: Event = { ...event, id, createdAt };
    this.events.set(id, newEvent);
    return newEvent;
  }

  async updateEvent(id: number, eventData: Partial<InsertEvent>): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;
    
    const updatedEvent = { ...event, ...eventData };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }

  // Booking methods
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.bookingIdCounter++;
    const createdAt = new Date();
    const newBooking: Booking = { ...booking, id, createdAt };
    this.bookings.set(id, newBooking);
    return newBooking;
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId,
    );
  }

  async getBookingsByEvent(eventId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.eventId === eventId,
    );
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, status };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialIdCounter++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
}

export const storage = new MemStorage();
