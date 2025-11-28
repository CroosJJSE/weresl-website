@echo off
echo 🚀 Setting up WE'RE SL website for local development...

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo ✅ Node.js detected
node -v

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo 📝 Creating .env.local file...
    copy .env.local.example .env.local
    echo ✅ Created .env.local - Please add your Firebase credentials (optional for basic testing)
) else (
    echo ✅ .env.local already exists
)

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. (Optional) Add Firebase credentials to .env.local
echo 2. Run 'npm run dev' to start the development server
echo 3. Open http://localhost:3000 in your browser
echo.
echo For more information, see LOCAL_SETUP.md

pause

