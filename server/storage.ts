// import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
// import { type Category, type Product, type InsertCategory, type InsertProduct, type ProductSearch } from "@shared/schema";
// import dotenv from 'dotenv';

// // Load environment variables if not already loaded
// if (!process.env.MONGODB_URI) {
//   dotenv.config();
// }

// export interface IStorage {
//   // Categories
//   getCategories(): Promise<Category[]>;
//   getCategoryBySlug(slug: string): Promise<Category | null>;
//   createCategory(category: InsertCategory): Promise<Category>;

//   // Products
//   getProducts(search?: ProductSearch): Promise<Product[]>;
//   getProductById(id: string): Promise<Product | null>;
//   getProductsByCategory(category: string): Promise<Product[]>;
//   createProduct(product: InsertProduct): Promise<Product>;
//   searchProducts(query: string): Promise<Product[]>;

//   // Initialize with sample data
//   initializeData(): Promise<void>;
// }

// export class MongoStorage implements IStorage {
//   private client: MongoClient;
//   private db: Db;
//   private categoriesCollection: Collection<Category>;
//   private productsCollection: Collection<Product>;

//   constructor(uri: string) {
//     this.client = new MongoClient(uri);
//     this.db = this.client.db('saree_catalog');
//     this.categoriesCollection = this.db.collection<Category>('categories');
//     this.productsCollection = this.db.collection<Product>('products');
//   }

//   async connect(): Promise<void> {
//     await this.client.connect();
//     console.log('Connected to MongoDB');
//     await this.initializeData();
//   }

//   async disconnect(): Promise<void> {
//     await this.client.close();
//     console.log('Disconnected from MongoDB');
//   }

//   // Categories
//   async getCategories(): Promise<Category[]> {
//     const categories = await this.categoriesCollection.find({}).toArray();
//     return categories.map(cat => ({ ...cat, _id: cat._id?.toString() }));
//   }

//   async getCategoryBySlug(slug: string): Promise<Category | null> {
//     const category = await this.categoriesCollection.findOne({ slug });
//     return category ? { ...category, _id: category._id?.toString() } : null;
//   }

//   async createCategory(category: InsertCategory): Promise<Category> {
//     const now = new Date();
//     const newCategory = {
//       ...category,
//       createdAt: now,
//       updatedAt: now,
//     };

//     const result = await this.categoriesCollection.insertOne(newCategory as any);
//     return {
//       ...newCategory,
//       _id: result.insertedId.toString(),
//     };
//   }

//   // Products
//   async getProducts(search?: ProductSearch): Promise<Product[]> {
//     let filter: any = {};

//     if (search) {
//       if (search.search) {
//         filter.$or = [
//           { name: { $regex: search.search, $options: 'i' } },
//           { description: { $regex: search.search, $options: 'i' } },
//         ];
//       }

//       if (search.category && search.category !== 'all') {
//         filter.category = search.category;
//       }

//       if (search.material) {
//         filter.material = search.material;
//       }

//       if (search.priceMin !== undefined || search.priceMax !== undefined) {
//         filter.price = {};
//         if (search.priceMin !== undefined) {
//           filter.price.$gte = search.priceMin;
//         }
//         if (search.priceMax !== undefined) {
//           filter.price.$lte = search.priceMax;
//         }
//       }
//     }

//     const products = await this.productsCollection.find(filter).toArray();
//     return products.map(product => ({ ...product, _id: product._id?.toString() }));
//   }

//   async getProductById(id: string): Promise<Product | null> {
//     const product = await this.productsCollection.findOne({ _id: new ObjectId(id) } as any);
//     return product ? { ...product, _id: product._id?.toString() } : null;
//   }

//   async getProductsByCategory(category: string): Promise<Product[]> {
//     const products = await this.productsCollection.find({ category }).toArray();
//     return products.map(product => ({ ...product, _id: product._id?.toString() }));
//   }

//   async createProduct(product: InsertProduct): Promise<Product> {
//     const now = new Date();
//     const newProduct = {
//       ...product,
//       createdAt: now,
//       updatedAt: now,
//     };

//     const result = await this.productsCollection.insertOne(newProduct as any);
//     return {
//       ...newProduct,
//       _id: result.insertedId.toString(),
//     };
//   }

//   async searchProducts(query: string): Promise<Product[]> {
//     const products = await this.productsCollection.find({
//       $or: [
//         { name: { $regex: query, $options: 'i' } },
//         { description: { $regex: query, $options: 'i' } },
//         { material: { $regex: query, $options: 'i' } },
//       ],
//     }).toArray();

//     return products.map(product => ({ ...product, _id: product._id?.toString() }));
//   }

//   async clearAllData(): Promise<void> {
//     await this.categoriesCollection.deleteMany({});
//     await this.productsCollection.deleteMany({});
//     console.log('All existing data cleared');
//   }

//   async initializeData(): Promise<void> {
//     // Force clear and reinitialize data (remove this in production)
//     await this.clearAllData();
    
//     // Check if data already exists
//     const categoryCount = await this.categoriesCollection.countDocuments();
//     const productCount = await this.productsCollection.countDocuments();

//     if (categoryCount === 0) {
//       // Insert new categories with SVG icons
//       const categories = [
//         {
//           name: "Premium Silk",
//           slug: "premium-silk",
//           description: "Luxurious premium silk sarees with exquisite craftsmanship",
//           imageUrl: "/images/1.svg",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           name: "Zariwork Tissue",
//           slug: "zariwork-tissue", 
//           description: "Elegant tissue sarees with intricate zari work and gold threads",
//           imageUrl: "/images/2.svg",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           name: "Georgette",
//           slug: "georgette",
//           description: "Contemporary georgette sarees with modern designs and comfort",
//           imageUrl: "/images/3.svg",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ];

//       await this.categoriesCollection.insertMany(categories);
//       console.log('New categories inserted');
//     }

//     if (productCount === 0) {
//       // Insert sample products for new categories
//       const products = [
//         {
//           name: "Royal Premium Silk Saree",
//           category: "premium-silk",
//           price: 85000,
//           material: "silk",
//           description: "Exquisite premium silk saree with rich texture and lustrous finish. Perfect for grand celebrations and weddings.",
//           images: [
//             "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
//             "https://images.unsplash.com/photo-1594736797933-d0408ba2d306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
//           ],
//           colors: ["Deep Burgundy", "Royal Navy", "Emerald Green", "Golden Amber"],
//           inStock: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           name: "Handwoven Premium Mulberry Silk",
//           category: "premium-silk",
//           price: 95000,
//           material: "silk",
//           description: "Authentic handwoven mulberry silk with traditional motifs and contemporary elegance.",
//           images: [
//             "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
//             "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
//           ],
//           colors: ["Ivory White", "Champagne Gold", "Rose Pink", "Deep Teal"],
//           inStock: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           name: "Golden Zari Tissue Masterpiece",
//           category: "zariwork-tissue",
//           price: 125000,
//           material: "tissue",
//           description: "Stunning tissue saree with intricate golden zari work and traditional patterns. A true work of art.",
//           images: [
//             "https://images.unsplash.com/photo-1594736797933-d0408ba2d306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
//             "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
//           ],
//           colors: ["Classic Gold", "Silver Tissue", "Rose Gold", "Antique Bronze"],
//           inStock: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           name: "Heritage Zariwork Tissue",
//           category: "zariwork-tissue",
//           price: 150000,
//           material: "tissue",
//           description: "Premium heritage tissue saree with elaborate zari embroidery and traditional Indian motifs.",
//           images: [
//             "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
//             "https://images.unsplash.com/photo-1594736797933-d0408ba2d306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
//           ],
//           colors: ["Bridal Red", "Royal Purple", "Deep Green", "Majestic Blue"],
//           inStock: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           name: "Designer Georgette Elegance",
//           category: "georgette",
//           price: 25000,
//           material: "georgette",
//           description: "Contemporary designer georgette saree with modern prints and elegant draping style.",
//           images: [
//             "https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
//             "https://images.unsplash.com/photo-1571053748382-141b7de59b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
//           ],
//           colors: ["Lavender Mist", "Coral Bloom", "Mint Breeze", "Sunset Orange"],
//           inStock: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           name: "Party Wear Georgette Shimmer",
//           category: "georgette",
//           price: 18000,
//           material: "georgette",
//           description: "Lightweight georgette saree with shimmer details and contemporary embellishments for parties.",
//           images: [
//             "https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
//             "https://images.unsplash.com/photo-1571053748382-141b7de59b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
//           ],
//           colors: ["Midnight Black", "Champagne", "Silver Grey", "Dusty Rose"],
//           inStock: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           name: "Floral Print Georgette",
//           category: "georgette",
//           price: 15000,
//           material: "georgette",
//           description: "Beautiful georgette saree with delicate floral prints and modern styling for casual elegance.",
//           images: [
//             "https://images.unsplash.com/photo-1571053748382-141b7de59b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
//             "https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
//           ],
//           colors: ["Soft Pink", "Sky Blue", "Cream White", "Peach Blossom"],
//           inStock: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           name: "Premium Silk Wedding Collection",
//           category: "premium-silk",
//           price: 200000,
//           material: "silk",
//           description: "Ultra-premium silk saree from our exclusive wedding collection with the finest craftsmanship.",
//           images: [
//             "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
//             "https://images.unsplash.com/photo-1594736797933-d0408ba2d306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
//           ],
//           colors: ["Bridal Maroon", "Golden Sunset", "Royal Indigo", "Vintage Wine"],
//           inStock: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         }
//       ];

//       await this.productsCollection.insertMany(products);
//       console.log('Sample products for new categories inserted');
//     }
//   }
// }

// const mongoUri = process.env.MONGODB_URI;
// if (!mongoUri) {
//   throw new Error('MONGODB_URI environment variable is required');
// }

// export const storage = new MongoStorage(mongoUri);
import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { type Category, type Product, type InsertCategory, type InsertProduct, type ProductSearch } from "@shared/schema";
import dotenv from 'dotenv';

// Load environment variables if not already loaded
if (!process.env.MONGODB_URI) {
  dotenv.config();
}

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Products
  getProducts(search?: ProductSearch): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string): Promise<Product[]>;

  // Initialize with sample data
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

  // Categories
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

  // Products
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
    // Check if categories already exist
    const categoryCount = await this.categoriesCollection.countDocuments();

    if (categoryCount === 0) {
      // Insert new categories only if they don't exist
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
      console.log('New categories inserted');
    } else {
      console.log('Categories already exist, skipping initialization');
    }

    // No sample products initialization - will only fetch existing products from MongoDB
    console.log('Data initialization complete');
  }
}

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MONGODB_URI environment variable is required');
}

export const storage = new MongoStorage(mongoUri);