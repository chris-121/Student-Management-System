📋 Student Management System API
A simple Task Management REST API built with Node.js, Express, and MongoDB.

🚀 Features
User authentication with JWT (Login / Logout)
Role-based access (Admin & Student)
Task CRUD operations
Only Admin can create tasks
Students can view only their tasks
Data validation with Joi
Error handling and proper HTTP responses

🛠️ Tech Stack
Backend: Node.js, Express
Database: MongoDB, Mongoose
Auth: JWT (Bearer Tokens)
Validation: Joi
Other: dotenv, bcrypt


git clone https://github.com/your-username/task-api.git
cd task-api
npm install

PORT=3000
JWT_SECRET="long_secret_key"
MONGODB_URI="mongodb+srv://admin:admin12345@cluster0.8nwzv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

To start server
npm run dev

Authentication
Login returns a JWT Bearer token.
Send the token in the Authorization header for protected routes:
Authorization: Bearer <your_token>
