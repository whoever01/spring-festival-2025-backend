import { connectToDatabase } from '../lib/db'
import config from '../config/config'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  try {
    const db = await connectToDatabase()
    const collection = db.collection('userTasks')

    if (req.method === 'GET') {
      const { userId } = req.query
      const userTasks = await collection.find({ userId }).toArray()
      return res.json(userTasks)
    }

    if (req.method === 'POST') {
      const { userId, taskId } = req.body
      
      // 检查用户当前进行的任务数量
      const currentTasks = await collection.countDocuments({
        userId,
        status: 'in_progress'
      })
      
      if (currentTasks >= config.system.maxTasks) {
        return res.status(400).json({ 
          error: '已达到最大任务数量限制'
        })
      }

      const result = await collection.insertOne({
        userId,
        taskId,
        status: 'in_progress',
        startTime: new Date()
      })
      return res.json(result)
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
} 