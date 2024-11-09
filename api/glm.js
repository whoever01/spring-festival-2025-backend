export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  if (req.method === 'POST') {
    try {
      const timeout = 30000 // 30秒
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GLM_API_KEY}`
        },
        body: JSON.stringify({
          model: "glm-4-flash",  // 改为 glm-4-flash
          messages: req.body.messages,
          temperature: 0.7,
          top_p: 0.95,
          max_tokens: 2048  // 增加 token 限制
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`GLM API responded with status: ${response.status}`)
      }
      
      const data = await response.json()
      return res.json(data)
    } catch (error) {
      console.error('GLM API Error:', error)
      return res.status(500).json({ 
        error: error.message,
        type: error.name,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
} 