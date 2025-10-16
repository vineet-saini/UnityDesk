@echo off
echo Starting UnityDesk Project Collaboration Tool...
echo.

echo Starting Backend Server (Port 3000)...
start "Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server (Port 3001)...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3000
echo Frontend: http://localhost:3001
echo.
pause