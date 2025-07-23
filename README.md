# 💬 MERN Chat App

A modern real-time chat application built with the **MERN** stack. Features real-time messaging via Socket.IO, user authentication with JWT, image uploads using Cloudinary, and a clean UI powered by Tailwind CSS and Radix UI.

---

## ⚙️ Tech Stack

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **Socket.IO**
- **JWT Authentication**
- **Cloudinary** for image upload
- **dotenv**, **bcryptjs**, **cookie-parser**

### Frontend
- **React 19** + **Vite**
- **Zustand** for global state management
- **React Router v7**
- **Tailwind CSS 4** + **Radix UI**
- **Socket.IO Client**
- **Axios**

---

## ✅ Features
- 🔒 User authentication with JWT

- 💬 Real-time messaging with Socket.IO

- 🖼️ Profile image upload using Cloudinary

- 🌐 Zustand for global state management

- 🎨 Responsive UI with Tailwind CSS + Radix UI

- 🌗 Light/Dark theme support

- 📦 Modular and scalable project structure

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kilicalparslan/chat-app.git
cd chat-app
```

### 2. Setup Environment Variables

Create a .env file inside the backend/ folder and add the following:

```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 4. Run the Application

```bash
cd backend
npm run dev
```
Runs the server on localhost:5000

```bash
cd ../frontend
npm run dev
```
Launches the app using Vite on localhost:5173.

