# UnityDesk - Project Collaboration Tool

A full-stack project collaboration tool built with React frontend and Node.js backend, connected via MongoDB.

## Configuration

- **Backend Port**: 3000
- **Frontend Port**: 3001
- **Database**: MongoDB (unitydesk)
- **Connection URI**: mongodb://localhost:27017/unitydesk

## Quick Start

### Option 1: Using Startup Script (Windows)
```bash
# Double-click start.bat or run:
start.bat
```

### Option 2: Using NPM Scripts
```bash
# Install dependencies for both frontend and backend
npm run install-all

# Install concurrently for running both servers
npm install

# Start both servers simultaneously
npm run dev
```

### Option 3: Manual Start
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Environment Variables

Backend `.env` file contains:
```
PORT=3000
DATABASE_NAME=unitydesk
CONNECTION_URI=mongodb://localhost:27017/unitydesk
JWT_SECRET=user_secret
EMAIL_USER=mehak28042005@gmail.com
EMAIL_PASS=rhxlmmrtfexqfhho
```

## API Endpoints

- **Authentication**: `/api/auth`
- **Projects**: `/api/projects`
- **Tasks**: `/api/tasks`
- **Admin**: `/api/admin`

## Access URLs

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000/api

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn