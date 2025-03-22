# 📋 Student Management System API

A simple and efficient **Student Management System API** built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- 🔐 **User Authentication** with JWT (Login / Logout)
- 👥 **Role-based Access** (Admin & Student)
- ✅ **Task CRUD Operations**
- 🧑‍🏫 **Only Admin Can Create Tasks**
- 👨‍🎓 **Students Can View Only Their Tasks**
- 🛡️ **Data Validation** with Joi
- ⚠️ **Error Handling** with proper HTTP responses

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (Bearer Tokens)
- **Validation**: Joi
- **Other Tools**: dotenv, bcrypt

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/chris-121/Student-Management-System.git
cd Student-Management-System
npm install
```

## ⚙️ Environment Variables
Create a .env file in the project root:
```bash
PORT=3000
JWT_SECRET="long_secret_key"
MONGODB_URI="mongodb+srv://admin:admin12345@cluster0.8nwzv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
```

## 🚀 Start Server
Start the development server:
```bash
npm run dev
```
Server running on: http://localhost:3000

## 🔐 Authentication
On successful login, you receive a JWT Bearer token.

Use it in the Authorization header for protected routes:
```bash
Authorization: Bearer <your_token>
```

## API Documentation
https://documenter.getpostman.com/view/20976819/2sAYkHnHWz
