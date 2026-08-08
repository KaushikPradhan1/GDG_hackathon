#!/bin/bash

echo "🚀 Initiating Nexus Engine Deployment Protocol..."

# 1. Update the system and install core dependencies
echo "📦 Installing system dependencies..."
sudo apt update && sudo apt install -y python3-pip python3-venv curl build-essential

# 2. Install Node.js (v20)
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install PM2 globally
echo "⚙️ Installing PM2 Process Manager..."
sudo npm install -g pm2

# 4. Setup Python Backend
echo "🐍 Configuring FastAPI Backend..."
cd backend || exit

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python requirements
pip install -r requirements.txt

# Start backend with PM2
echo "🔥 Launching Backend Service..."
pm2 start "venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000" --name "nexus-backend"
cd ..

# 5. Setup Next.js Frontend
echo "⚛️ Configuring Next.js Frontend..."
# Install Next.js dependencies
npm install

# Build the production application
npm run build

# Start frontend with PM2
echo "🔥 Launching Frontend Service..."
pm2 start "npm start" --name "nexus-frontend"

# 6. Save PM2 configuration to restart on server reboot
pm2 save
pm2 startup

echo "======================================================"
echo "✅ DEPLOYMENT COMPLETE: NEXUS ENGINE IS LIVE"
echo "======================================================"
echo "Backend: Running on port 8000"
echo "Frontend: Running on port 3000"
echo "To view live logs, run: pm2 logs"
