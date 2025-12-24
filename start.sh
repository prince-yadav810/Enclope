#!/bin/bash

# Enclope Project Startup Script
# This script starts both the client and server

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🚀 Starting Enclope Project..."
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Starting MongoDB..."
    brew services start mongodb-community
    sleep 2
else
    echo "✅ MongoDB is already running"
fi

echo ""
echo "🔧 Starting Server (Backend)..."
echo "   Server will run on http://localhost:5100"
echo ""

# Start server in background
cd "$SCRIPT_DIR/server" && npm run dev &
SERVER_PID=$!

# Wait a bit for server to start
sleep 3

echo ""
echo "🎨 Starting Client (Frontend)..."
echo "   Client will run on http://localhost:3000"
echo ""

# Start client
cd "$SCRIPT_DIR/client" && npm run dev

# When client is stopped (Ctrl+C), also stop the server
kill $SERVER_PID 2>/dev/null
