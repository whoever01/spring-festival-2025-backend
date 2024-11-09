import { connectToDatabase } from '../lib/db'

export default async function handler(req, res) {
  // 允许 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return res.status(200).end()
  }

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  
  try {
    const db = await connectToDatabase()
    const collection = db.collection('wishes')

    if (req.method === 'GET') {
      const { page = 1, limit = 20 } = req.query
      const skip = (page - 1) * limit
      
      const [wishes, total] = await Promise.all([
        collection
          .find({})
          .sort({ createTime: -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .toArray(),
        collection.countDocuments()
      ])
      
      return res.json({
        wishes,
        total,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit)
      })
    }

    if (req.method === 'POST') {
      const { content, userId, userInfo } = req.body
      const result = await collection.insertOne({
        content,
        userId,
        userInfo,
        likes: 0,
        createTime: new Date()
      })
      return res.json(result)
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
} 