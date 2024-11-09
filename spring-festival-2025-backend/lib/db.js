import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
let cachedDb = null

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db('spring-festival-2025')
  cachedDb = db
  return db
} 