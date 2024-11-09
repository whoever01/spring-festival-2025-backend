import config from '../../config/config'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  if (req.method === 'POST') {
    try {
      const { password } = req.body
      
      if (password === config.system.adminPassword) {
        return res.json({ 
          success: true,
          message: '验证成功'
        })
      } else {
        return res.status(401).json({ 
          success: false,
          message: '密码错误'
        })
      }
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
} 