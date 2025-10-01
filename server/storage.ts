import { db } from "./db";
import { categories, products, type Category, type Product, type InsertCategory, type InsertProduct, type ProductSearch } from "@shared/schema";
import { eq, and, or, gte, lte, ilike, sql } from "drizzle-orm";

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  createCategory(category: InsertCategory): Promise<Category>;
  getProducts(search?: ProductSearch): Promise<Product[]>;
  getProductById(id: number): Promise<Product | null>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string): Promise<Product[]>;
  initializeData(): Promise<void>;
}

export class PostgresStorage implements IStorage {
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
    return result[0] || null;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await db.insert(categories).values(category).returning();
    return result[0];
  }

  async getProducts(search?: ProductSearch): Promise<Product[]> {
    let query = db.select().from(products);
    const conditions = [];

    if (search) {
      if (search.search) {
        conditions.push(
          or(
            ilike(products.name, `%${search.search}%`),
            ilike(products.description, `%${search.search}%`)
          )
        );
      }

      if (search.category && search.category !== 'all') {
        conditions.push(eq(products.category, search.category));
      }

      if (search.material) {
        conditions.push(eq(products.material, search.material));
      }

      if (search.priceMin !== undefined) {
        conditions.push(gte(products.price, search.priceMin));
      }

      if (search.priceMax !== undefined) {
        conditions.push(lte(products.price, search.priceMax));
      }
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    return await query;
  }

  async getProductById(id: number): Promise<Product | null> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0] || null;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  async searchProducts(query: string): Promise<Product[]> {
    return await db.select().from(products).where(
      or(
        ilike(products.name, `%${query}%`),
        ilike(products.description, `%${query}%`),
        ilike(products.material, `%${query}%`)
      )
    );
  }

  async initializeData(): Promise<void> {
    const categoryCount = await db.select({ count: sql<number>`count(*)` }).from(categories);
    
    if (categoryCount[0].count === 0) {
      const categoriesToInsert = [
        {
          name: "New Trends",
          slug: "new-trends",
          description: "Latest trending sarees with contemporary designs and modern patterns",
          imageUrl: "/images/1.svg",
        },
        {
          name: "Banarasi Silk",
          slug: "banarasi-silk",
          description: "Traditional Banarasi silk sarees with authentic craftsmanship and heritage designs",
          imageUrl: "/images/2.svg",
        },
        {
          name: "Georgette",
          slug: "georgette",
          description: "Lightweight georgette sarees perfect for all occasions with elegant draping",
          imageUrl: "/images/3.svg",
        },
        {
          name: "Printed Silk",
          slug: "printed-silk",
          description: "Beautiful printed silk sarees with vibrant colors and artistic patterns",
          imageUrl: "/images/4.svg",
        },
        {
          name: "Satin",
          slug: "satin",
          description: "Luxurious satin sarees with smooth texture and lustrous finish",
          imageUrl: "/images/5.svg",
        },
        {
          name: "Pure Cotton",
          slug: "pure-cotton",
          description: "Comfortable pure cotton sarees ideal for daily wear and casual occasions",
          imageUrl: "/images/6.svg",
        }
      ];

      await db.insert(categories).values(categoriesToInsert);
      console.log('Categories inserted successfully');
    } else {
      console.log('Categories already exist, skipping initialization');
    }

    console.log('Data initialization complete');
  }
}

export const storage = new PostgresStorage();
