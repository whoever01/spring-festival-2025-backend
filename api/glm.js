export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  if (req.method === 'POST') {
    try {
      const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GLM_API_KEY}`
        },
        body: JSON.stringify(req.body)
      })
      
      const data = await response.json()
      return res.json(data)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
} 