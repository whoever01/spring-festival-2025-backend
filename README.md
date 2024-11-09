# 2025李氏联欢晚会小程序后端服务

基于 Vercel Serverless Functions 构建的后端服务，为2025年乙巳年春节联欢晚会小程序提供支持。

## 功能特性

- 愿望墙：发布新年愿望、点赞互动
- 任务系统：新年任务管理、进度跟踪
- AI助手：基于智谱AI GLM-4-flash的智能对话
- 管理员系统：任务管理、数据统计

## 技术架构

- 运行环境：Node.js
- 数据存储：MongoDB Atlas
- 部署平台：Vercel Serverless
- AI对话：智谱AI GLM-4-flash 模型

## API接口说明

### 愿望墙模块


bash

GET /api/wishes # 获取愿望列表，支持分页

POST /api/wishes # 发布新愿望

POST /api/likes # 为愿望点赞


### 任务系统


bash

GET /api/tasks # 获取任务列表

POST /api/tasks # 创建新任务(管理员)

GET /api/user-tasks # 获取用户任务进度

POST /api/user-tasks # 用户接受新任务


### AI助手


bash

POST /api/glm # AI对话接口



### 管理员


bash

POST /api/admin/verify # 管理员身份验证


## 环境变量配置

需要在 Vercel 中配置以下环境变量：


bash

MONGODB_URI= # MongoDB Atlas 连接字符串

GLM_API_KEY= # 智谱AI GLM-4-flash API密钥



## 本地开发

1. 安装依赖


bash

npm install



2. 配置环境变量
   创建 `.env.local` 文件：


bash

MONGODB_URI=your_mongodb_uri

GLM_API_KEY=your_glm_api_key



3. 启动开发服务器


bash

vercel dev



## 项目结构


spring-festival-2025-backend/

├── api/ # API接口目录

│ ├── glm.js # AI对话接口

│ ├── likes.js # 点赞相关接口

│ ├── wishes.js # 愿望墙接口

│ ├── tasks.js # 任务管理接口

│ ├── user-tasks.js # 用户任务接口

│ └── admin/

│ └── verify.js # 管理员验证

├── lib/

│ └── db.js # 数据库连接

├── package.json

└── vercel.json



## 部署说明

1. Fork 或克隆本仓库
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 等待自动部署完成

## 注意事项

- 所有API接口已启用CORS，支持跨域请求
- GLM-4-flash 模型支持更快的响应速度
- 建议在生产环境中配置请求频率限制
- 数据库查询已优化索引

## 更新日志

### v1.0.0 (2024-01-09)

- 初始化项目
- 集成 GLM-4-flash 模型
- 实现基础API功能

## 许可证

[MIT](LICENSE) © 2024
