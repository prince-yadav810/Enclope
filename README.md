# 🎯 Enclope

A full-stack web application built with React, Three.js, Node.js, Express, and MongoDB.

## ✨ Features

- **3D Graphics** - Interactive 3D elements using Three.js and React Three Fiber
- **Smooth Animations** - Beautiful animations with Framer Motion
- **Modern UI** - Styled with Tailwind CSS and Styled Components
- **RESTful API** - Express backend with MongoDB database
- **Project Management** - Store and retrieve project data

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 19
- ⚡ Vite
- 🎨 Three.js & React Three Fiber
- 🎭 Framer Motion
- 💅 Styled Components
- 🎨 Tailwind CSS
- 🧭 React Router

### Backend
- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB with Mongoose
- 🔄 CORS enabled

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB

### Installation & Running

**Option 1: One-Command Start (Recommended)**
```bash
./start.sh
```

**Option 2: Manual Start**

1. **Install dependencies** (first time only):
```bash
# Client
cd client && npm install

# Server
cd ../server && npm install
```

2. **Start MongoDB** (if not running):
```bash
brew services start mongodb-community
```

3. **Run the application**:

Terminal 1 - Server:
```bash
cd server
npm run dev
```

Terminal 2 - Client:
```bash
cd client
npm run dev
```

4. **Open your browser**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5100

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/api/projects` | Get all projects |

## 🗄️ Database Schema

### Project Model
```javascript
{
  title: String (required),
  description: String (required),
  techStack: [String] (required)
}
```

## 📁 Project Structure

```
Enclope/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                 # Express backend
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   └── ProjectModel.js
│   ├── index.js           # Server entry point
│   └── package.json
├── start.sh               # Quick start script
├── SETUP.md              # Detailed setup guide
└── README.md             # This file
```

## 🔧 Development

### Client Commands
```bash
cd client
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

### Server Commands
```bash
cd server
npm run dev      # Start with auto-reload
npm start        # Start normally
```

## 🐛 Troubleshooting

See [SETUP.md](./SETUP.md) for detailed troubleshooting guide.

**Common Issues:**

1. **MongoDB not running**: `brew services start mongodb-community`
2. **Port in use**: Server will auto-select next available port
3. **Dependencies issue**: Delete `node_modules` and run `npm install` again

## 📝 License

ISC

---

Made with ❤️ using React, Three.js, and MongoDB
