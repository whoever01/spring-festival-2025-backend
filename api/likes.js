import { connectToDatabase } from '../lib/db'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  if (req.method === 'POST') {
    try {
      const db = await connectToDatabase()
      const { wishId, userId } = req.body

      // 检查是否已点赞
      const liked = await db.collection('likes').findOne({ wishId, userId })
      if (liked) {
        return res.status(400).json({ error: '已经点赞过了' })
      }

      // 添加点赞记录
      await db.collection('likes').insertOne({
        wishId,
        userId,
        createTime: new Date()
      })

      // 更新愿望点赞数
      await db.collection('wishes').updateOne(
        { _id: wishId },
        { $inc: { likes: 1 } }
      )

      return res.json({ success: true })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
} 