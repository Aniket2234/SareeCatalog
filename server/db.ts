import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

const client = new MongoClient(process.env.MONGODB_URI);
let db: Db;

export async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db('saree_catalog');
    console.log('Connected to MongoDB');
  }
  return db;
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}
