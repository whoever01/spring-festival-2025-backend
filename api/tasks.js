import { connectToDatabase } from '../lib/db'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  try {
    const db = await connectToDatabase()
    const collection = db.collection('tasks')

    if (req.method === 'GET') {
      const tasks = await collection.find({}).toArray()
      return res.json(tasks)
    }

    if (req.method === 'POST') {
      const { task } = req.body
      const result = await collection.insertOne({
        ...task,
        createTime: new Date()
      })
      return res.json(result)
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
} 