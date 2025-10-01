import { pgTable, text, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const products = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(),
  material: text("material").notNull(),
  description: text("description").notNull(),
  images: json("images").$type<string[]>().notNull(),
  colors: json("colors").$type<string[]>().notNull(),
  inStock: boolean("in_stock").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Category slug is required"),
  description: z.string().min(1, "Category description is required"),
  imageUrl: z.string().optional(),
});

export const selectCategorySchema = createSelectSchema(categories);

export const insertProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
  material: z.string().min(1, "Material is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  colors: z.array(z.string()).min(1, "At least one color is required"),
  inStock: z.boolean().default(true),
});

export const selectProductSchema = createSelectSchema(products);

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export const productSearchSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  material: z.string().optional(),
});

export type ProductSearch = z.infer<typeof productSearchSchema>;
