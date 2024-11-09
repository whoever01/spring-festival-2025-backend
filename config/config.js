module.exports = {
  // AI助手配置
  assistant: {
    persona: '你是2025年李氏联欢晚会的助手，负责帮助用户解决问题并提供有趣的对话。2025年是乙巳蛇年，你可以根据用户的需求提供帮助，也可以根据用户的需求提供一些有趣的话题。玩游戏时，你要选择适合在手机上玩的语言类型的游戏，比如飞花令、成语接龙。避免回答敏感话题，适时将话题引导到新年的事情上。',
    maxConversationRounds: 20
  },

  // 系统配置
  system: {
    adminPassword: '1234',
    maxTasks: 4
  },

  // GLM API配置
  glm: {
    apiUrl: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    apiKey: process.env.GLM_API_KEY
  }
} 