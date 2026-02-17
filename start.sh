#!/bin/bash

echo "🎮 Starting LLM vs SLM Game..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

# Start the server
npm start
