import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { type Category, type Product, type InsertCategory, type InsertProduct, type ProductSearch } from "@shared/schema";

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  createCategory(category: InsertCategory): Promise<Category>;
  getProducts(search?: ProductSearch): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string): Promise<Product[]>;
  initializeData(): Promise<void>;
}

export class MongoStorage implements IStorage {
  private client: MongoClient;
  private db: Db;
  private categoriesCollection: Collection<Category>;
  private productsCollection: Collection<Product>;

  constructor(uri: string) {
    this.client = new MongoClient(uri);
    this.db = this.client.db('saree_catalog');
    this.categoriesCollection = this.db.collection<Category>('categories');
    this.productsCollection = this.db.collection<Product>('products');
  }

  async connect(): Promise<void> {
    await this.client.connect();
    console.log('Connected to MongoDB');
    await this.initializeData();
  }

  async disconnect(): Promise<void> {
    await this.client.close();
    console.log('Disconnected from MongoDB');
  }

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoriesCollection.find({}).toArray();
    return categories.map(cat => ({ ...cat, _id: cat._id?.toString() }));
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const category = await this.categoriesCollection.findOne({ slug });
    return category ? { ...category, _id: category._id?.toString() } : null;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const now = new Date();
    const newCategory = {
      ...category,
      createdAt: now,
      updatedAt: now,
    };

    const result = await this.categoriesCollection.insertOne(newCategory as any);
    return {
      ...newCategory,
      _id: result.insertedId.toString(),
    };
  }

  async getProducts(search?: ProductSearch): Promise<Product[]> {
    let filter: any = {};

    if (search) {
      if (search.search) {
        filter.$or = [
          { name: { $regex: search.search, $options: 'i' } },
          { description: { $regex: search.search, $options: 'i' } },
        ];
      }

      if (search.category && search.category !== 'all') {
        filter.category = search.category;
      }

      if (search.material) {
        filter.material = search.material;
      }

      if (search.priceMin !== undefined || search.priceMax !== undefined) {
        filter.price = {};
        if (search.priceMin !== undefined) {
          filter.price.$gte = search.priceMin;
        }
        if (search.priceMax !== undefined) {
          filter.price.$lte = search.priceMax;
        }
      }
    }

    const products = await this.productsCollection.find(filter).toArray();
    return products.map(product => ({ ...product, _id: product._id?.toString() }));
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await this.productsCollection.findOne({ _id: new ObjectId(id) } as any);
    return product ? { ...product, _id: product._id?.toString() } : null;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const products = await this.productsCollection.find({ category }).toArray();
    return products.map(product => ({ ...product, _id: product._id?.toString() }));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const now = new Date();
    const newProduct = {
      ...product,
      createdAt: now,
      updatedAt: now,
    };

    const result = await this.productsCollection.insertOne(newProduct as any);
    return {
      ...newProduct,
      _id: result.insertedId.toString(),
    };
  }

  async searchProducts(query: string): Promise<Product[]> {
    const products = await this.productsCollection.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { material: { $regex: query, $options: 'i' } },
      ],
    }).toArray();

    return products.map(product => ({ ...product, _id: product._id?.toString() }));
  }

  async initializeData(): Promise<void> {
    const categoryCount = await this.categoriesCollection.countDocuments();

    if (categoryCount === 0) {
      const categories = [
        {
          name: "New Trends",
          slug: "new-trends",
          description: "Latest trending sarees with contemporary designs and modern patterns",
          imageUrl: "/images/1.svg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Banarasi Silk",
          slug: "banarasi-silk",
          description: "Traditional Banarasi silk sarees with authentic craftsmanship and heritage designs",
          imageUrl: "/images/2.svg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Georgette",
          slug: "georgette",
          description: "Lightweight georgette sarees perfect for all occasions with elegant draping",
          imageUrl: "/images/3.svg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Printed Silk",
          slug: "printed-silk",
          description: "Beautiful printed silk sarees with vibrant colors and artistic patterns",
          imageUrl: "/images/4.svg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Satin",
          slug: "satin",
          description: "Luxurious satin sarees with smooth texture and lustrous finish",
          imageUrl: "/images/5.svg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pure Cotton",
          slug: "pure-cotton",
          description: "Comfortable pure cotton sarees ideal for daily wear and casual occasions",
          imageUrl: "/images/6.svg",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ];

      await this.categoriesCollection.insertMany(categories);
      console.log('Categories inserted successfully');
    } else {
      console.log('Categories already exist, skipping initialization');
    }

    console.log('Data initialization complete');
  }
}

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MONGODB_URI environment variable is required');
}

export const storage = new MongoStorage(mongoUri);
