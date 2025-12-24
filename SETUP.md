# 🚀 Enclope Project Setup Guide

This is a full-stack web application with a React frontend and Node.js/Express backend connected to MongoDB.

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)

## 🔧 Installation Steps

### Step 1: Install Dependencies

Open a terminal and run the following commands:

```bash
# Navigate to the project root
cd /Users/princeyadav/Downloads/coding-lang/projects/Enclope/Enclope

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Step 2: Start MongoDB

Make sure MongoDB is running on your system:

**Option A - If MongoDB is installed as a service:**
```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Or check if it's already running
brew services list
```

**Option B - Start MongoDB manually:**
```bash
mongod --dbpath /path/to/your/data/directory
```

**Option C - Use MongoDB Atlas (Cloud):**
If you prefer using MongoDB Atlas (cloud database), you'll need to:
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Update `server/config/db.js` with your connection string

### Step 3: Verify MongoDB Connection

The server is configured to connect to:
- **Host:** `localhost:27017`
- **Database:** `enclope`

The database will be created automatically when you first run the server.

## 🏃 Running the Application

You have two options:

### Option 1: Use the Startup Script (Recommended)

Simply run:
```bash
# From the project root
npm start
```

This will start both the client and server simultaneously.

### Option 2: Manual Start (Two Terminals)

**Terminal 1 - Start the Server:**
```bash
cd /Users/princeyadav/Downloads/coding-lang/projects/Enclope/Enclope/server
npm run dev
```
The server will run on `http://localhost:5100`

**Terminal 2 - Start the Client:**
```bash
cd /Users/princeyadav/Downloads/coding-lang/projects/Enclope/Enclope/client
npm run dev
```
The client will run on `http://localhost:3000` (or another port if 5173 is busy)

## 🌐 Accessing the Application

Once both servers are running:
1. Open your browser
2. Navigate to `http://localhost:3000` (or the URL shown in the client terminal)

## 📊 API Endpoints

The server provides the following endpoints:

- `GET /` - Welcome message
- `GET /api/projects` - Fetch all projects from the database

## 🗄️ Database Schema

The application uses a `Project` model with the following structure:

```javascript
{
  title: String (required),
  description: String (required),
  techStack: [String] (required)
}
```

## 🛠️ Troubleshooting

### MongoDB Connection Issues

If you see `MongoDB connection error`:
1. Verify MongoDB is running: `mongosh` (should connect without errors)
2. Check if port 27017 is available
3. Ensure no firewall is blocking the connection

### Port Already in Use

If port 5100 (server) or 5173 (client) is already in use:
- **Server:** The server will automatically use the next available port
- **Client:** Vite will prompt you to use a different port

### Missing Dependencies

If you encounter module errors:
```bash
# Clear node_modules and reinstall
cd client
rm -rf node_modules package-lock.json
npm install

cd ../server
rm -rf node_modules package-lock.json
npm install
```

## 📝 Development Commands

### Client (Vite + React)
```bash
cd client
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Server (Node.js + Express)
```bash
cd server
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start normally
```

## 🎯 Next Steps

1. Add some sample projects to your database using MongoDB Compass or mongosh
2. Explore the React frontend code in `client/src`
3. Check out the 3D features using Three.js and React Three Fiber
4. Customize the application to your needs!

## 📚 Tech Stack

**Frontend:**
- React 19
- Vite
- Three.js & React Three Fiber (3D graphics)
- Framer Motion (animations)
- Styled Components
- React Router
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

---

Happy coding! 🎉
