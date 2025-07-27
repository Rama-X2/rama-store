@echo off
setlocal enabledelayedexpansion

REM =============================================================================
REM 🚀 WINDOWS BATCH DEPLOY SCRIPT - WEB TOPUP TO GITHUB & VERCEL
REM =============================================================================
REM Author: Auto Deploy Script  
REM Description: Deploy Web Topup project to GitHub and Vercel (Windows)
REM Usage: deploy.bat [command] [commit-message]
REM Commands: full, quick, update, help
REM =============================================================================

title Web Topup Deploy Script

REM Colors for Windows
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "PURPLE=[95m"
set "CYAN=[96m"
set "NC=[0m"

REM Project configuration
set "PROJECT_NAME=Project Web Topup"
set "GITHUB_REPO_NAME=web-topup-portfolio"
set "VERCEL_PROJECT_NAME=web-topup"
set "DEFAULT_BRANCH=main"

REM Get command line arguments
set "COMMAND=%~1"
set "COMMIT_MESSAGE=%~2"

REM Default command if none provided
if "%COMMAND%"=="" set "COMMAND=full"

REM =============================================================================
REM HELPER FUNCTIONS
REM =============================================================================

:print_header
echo.
echo %PURPLE%===============================================
echo 🚀 WEB TOPUP DEPLOY SCRIPT
echo ===============================================%NC%
echo.
goto :eof

:print_step
echo %BLUE%📍 %~1%NC%
goto :eof

:print_success
echo %GREEN%✅ %~1%NC%
goto :eof

:print_error
echo %RED%❌ Error: %~1%NC%
goto :eof

:print_warning
echo %YELLOW%⚠️  %~1%NC%
goto :eof

:print_info
echo %CYAN%ℹ️  %~1%NC%
goto :eof

:print_separator
echo %PURPLE%───────────────────────────────────────────%NC%
goto :eof

REM =============================================================================
REM CHECK REQUIREMENTS
REM =============================================================================

:check_requirements
call :print_step "Checking requirements..."

REM Check Git
git --version >nul 2>&1
if %errorlevel% neq 0 (
    call :print_error "Git is not installed. Please install Git first."
    call :print_info "Download from: https://git-scm.com/"
    pause
    exit /b 1
)
call :print_success "Git found"

REM Check Node.js (optional)
node --version >nul 2>&1
if %errorlevel% equ 0 (
    call :print_success "Node.js found"
) else (
    call :print_warning "Node.js not found. Install from: https://nodejs.org"
)

REM Check Vercel CLI (optional)
vercel --version >nul 2>&1
if %errorlevel% equ 0 (
    call :print_success "Vercel CLI found"
) else (
    call :print_info "Vercel CLI not found. Install with: npm i -g vercel"
)

call :print_success "Requirements check completed"
goto :eof

REM =============================================================================
REM PROJECT SETUP
REM =============================================================================

:setup_gitignore
call :print_step "Setting up .gitignore..."

if not exist ".gitignore" (
    (
    echo # Dependencies
    echo node_modules/
    echo npm-debug.log*
    echo yarn-debug.log*
    echo yarn-error.log*
    echo pnpm-debug.log*
    echo.
    echo # Build outputs
    echo dist/
    echo build/
    echo .next/
    echo .nuxt/
    echo .output/
    echo out/
    echo.
    echo # Environment variables
    echo .env
    echo .env.local
    echo .env.development.local
    echo .env.test.local
    echo .env.production.local
    echo .env.staging
    echo.
    echo # IDE and Editor files
    echo .vscode/
    echo .idea/
    echo *.swp
    echo *.swo
    echo *~
    echo.
    echo # OS generated files
    echo .DS_Store
    echo .DS_Store?
    echo ._*
    echo .Spotlight-V100
    echo .Trashes
    echo ehthumbs.db
    echo Thumbs.db
    echo.
    echo # Logs
    echo logs/
    echo *.log
    echo.
    echo # Runtime data
    echo pids/
    echo *.pid
    echo *.seed
    echo *.pid.lock
    echo.
    echo # Coverage directory
    echo coverage/
    echo *.lcov
    echo.
    echo # Dependency directories
    echo jspm_packages/
    echo.
    echo # Optional npm cache
    echo .npm
    echo.
    echo # Optional eslint cache
    echo .eslintcache
    echo.
    echo # Yarn Integrity file
    echo .yarn-integrity
    echo.
    echo # parcel-bundler cache
    echo .cache
    echo .parcel-cache
    echo.
    echo # next.js build output
    echo .next
    echo.
    echo # nuxt.js build output
    echo .nuxt
    echo.
    echo # Serverless directories
    echo .serverless/
    echo.
    echo # FuseBox cache
    echo .fusebox/
    echo.
    echo # DynamoDB Local files
    echo .dynamodb/
    echo.
    echo # Vercel
    echo .vercel
    echo.
    echo # Temporary files
    echo tmp/
    echo temp/
    echo .tmp/
    echo .temp/
    echo.
    echo # Editor backup files
    echo *~
    echo *.orig
    echo.
    echo # Local development
    echo .local/
    ) > .gitignore
    call :print_success ".gitignore created with comprehensive rules"
) else (
    call :print_info ".gitignore already exists"
)
goto :eof

:create_readme
call :print_step "Creating README.md..."

if not exist "README.md" (
    (
    echo # 🎮 Web Topup Portfolio
    echo.
    echo Modern gaming topup platform with integrated portfolio showcase.
    echo.
    echo ## ✨ Features
    echo.
    echo ### 🎯 Gaming Platform
    echo - **5 Game Categories**: Mobile Legends, Free Fire, PUBG Mobile, Genshin Impact, Valorant
    echo - **Smart Search**: Real-time game search functionality
    echo - **Featured Games**: Highlighted popular games section
    echo - **Transaction System**: Check transaction status
    echo - **Leaderboard**: Player rankings and statistics
    echo - **Load More**: Dynamic content loading
    echo.
    echo ### 👤 Portfolio Integration
    echo - **Dynamic Portfolio**: Interactive personal showcase
    echo - **Glass Morphism**: Modern UI with backdrop blur effects
    echo - **Animated Background**: Floating particles system
    echo - **6 Detailed Sections**: About, Skills, Projects, Experience, Testimonials, Contact
    echo - **Responsive Design**: Perfect on all devices
    echo - **Smooth Animations**: Framer Motion powered transitions
    echo.
    echo ### 🎨 Design Features
    echo - **Dark/Light Theme**: Toggle between themes
    echo - **Modern Animations**: Smooth transitions and effects
    echo - **Interactive Elements**: Hover effects and micro-interactions
    echo - **Mobile Optimized**: Touch-friendly interface
    echo - **Fast Loading**: Optimized performance
    echo.
    echo ## 🚀 Quick Start
    echo.
    echo 1. **Clone the repository**
    echo    ```bash
    echo    git clone https://github.com/YOUR_USERNAME/web-topup-portfolio.git
    echo    cd web-topup-portfolio
    echo    ```
    echo.
    echo 2. **Install dependencies** ^(if Node.js project^)
    echo    ```bash
    echo    npm install
    echo    ```
    echo.
    echo 3. **Start development server**
    echo    ```bash
    echo    npm start
    echo    # or for static files
    echo    python -m http.server 8000
    echo    ```
    echo.
    echo 4. **Open in browser**
    echo    ```
    echo    http://localhost:3000
    echo    # or http://localhost:8000 for static
    echo    ```
    echo.
    echo ## 🛠️ Technologies Used
    echo.
    echo - **Frontend**: HTML5, CSS3, JavaScript/TypeScript
    echo - **Animations**: Framer Motion
    echo - **Styling**: Tailwind CSS / Custom CSS
    echo - **Icons**: Lucide React / Font Awesome
    echo - **Deployment**: Vercel
    echo - **Version Control**: Git ^& GitHub
    echo.
    echo ## 🚀 Deployment
    echo.
    echo ### Automatic ^(using deploy script^)
    echo ```bash
    echo deploy.bat quick "Your commit message"
    echo ```
    echo.
    echo ### Manual GitHub
    echo ```bash
    echo git add .
    echo git commit -m "Your message"
    echo git push origin main
    echo ```
    echo.
    echo ## ✨ Features Overview
    echo.
    echo ### Gaming Platform
    echo - Real-time search across all games
    echo - Category-based filtering  
    echo - Featured games showcase
    echo - Transaction status checking
    echo - Player leaderboards
    echo - Responsive card layouts
    echo.
    echo ### Portfolio Showcase
    echo - Personal information and bio
    echo - Technical skills with progress indicators
    echo - Project gallery with detailed modals
    echo - Professional experience timeline
    echo - Client testimonials carousel
    echo - Contact form and social links
    echo.
    echo ## 📄 License
    echo.
    echo This project is open source and available under the [MIT License]^(LICENSE^).
    echo.
    echo ---
    echo.
    echo **Made with ❤️ for the gaming community**
    echo.
    echo 🎮 Happy Gaming ^& Coding! 🚀
    ) > README.md
    call :print_success "README.md created with comprehensive documentation"
) else (
    call :print_info "README.md already exists"
)
goto :eof

REM =============================================================================
REM GIT OPERATIONS
REM =============================================================================

:init_git_repo
call :print_step "Initializing Git repository..."

if not exist ".git" (
    git init
    git branch -M %DEFAULT_BRANCH%
    call :print_success "Git repository initialized with branch: %DEFAULT_BRANCH%"
) else (
    call :print_info "Git repository already exists"
    REM Ensure we're on the default branch
    git checkout %DEFAULT_BRANCH% 2>nul || git checkout -b %DEFAULT_BRANCH% 2>nul
)
goto :eof

:setup_git_config
call :print_step "Checking Git configuration..."

REM Check if user name is configured
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    call :print_warning "Git user name not configured"
    set /p user_name="Enter your full name: "
    git config --global user.name "!user_name!"
    call :print_success "Git user name configured"
)

REM Check if user email is configured  
git config user.email >nul 2>&1
if %errorlevel% neq 0 (
    call :print_warning "Git user email not configured"
    set /p user_email="Enter your email: "
    git config --global user.email "!user_email!"
    call :print_success "Git user email configured"
)

for /f "tokens=*" %%i in ('git config user.name') do set git_name=%%i
for /f "tokens=*" %%i in ('git config user.email') do set git_email=%%i
call :print_info "Git user: !git_name! <![git_email!]>"
goto :eof

:add_and_commit
set "commit_msg=%~1"

if "!commit_msg!"=="" (
    set "commit_msg=🚀 Deploy: Web Topup with Portfolio integration - %date% %time%"
)

call :print_step "Staging files for commit..."

REM Check if there are any changes
git diff --quiet 2>nul && git diff --cached --quiet 2>nul
if %errorlevel% equ 0 (
    call :print_warning "No changes detected to commit"
    goto :eof
)

REM Show what will be committed
call :print_info "Files to be committed:"
git status --porcelain 2>nul

REM Add all files
git add .

REM Commit with message
call :print_step "Committing changes..."
git commit -m "!commit_msg!"

if %errorlevel% equ 0 (
    call :print_success "Files committed successfully!"
    call :print_info "Commit message: '!commit_msg!'"
) else (
    call :print_error "Commit failed"
)
goto :eof

:setup_github_remote
call :print_step "Setting up GitHub remote..."

REM Check if remote already exists
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 (
    call :print_info "Remote 'origin' already exists:"
    git remote -v
    
    set /p update_remote="Do you want to update the remote URL? (y/N): "
    if /i "!update_remote!"=="y" call :setup_new_remote
) else (
    call :setup_new_remote
)
goto :eof

:setup_new_remote
echo.
call :print_info "GitHub repository setup needed"

set /p github_username="Enter your GitHub username: "

if "!github_username!"=="" (
    call :print_error "GitHub username is required"
    goto :eof
)

set /p repo_name="Enter repository name [%GITHUB_REPO_NAME%]: "
if "!repo_name!"=="" set "repo_name=%GITHUB_REPO_NAME%"

set "remote_url=https://github.com/!github_username!/!repo_name!.git"

REM Remove existing remote if it exists
git remote remove origin 2>nul

REM Add new remote
git remote add origin "!remote_url!"

call :print_success "Remote added: !remote_url!"
call :print_info "Make sure the repository exists on GitHub!"
call :print_info "Create it at: https://github.com/new"
goto :eof

:push_to_github
call :print_step "Pushing to GitHub..."

REM Get current branch
for /f "tokens=*" %%i in ('git branch --show-current 2^>nul') do set current_branch=%%i
if "!current_branch!"=="" set "current_branch=%DEFAULT_BRANCH%"

call :print_info "Pushing branch: !current_branch!"

REM Push with upstream
git push -u origin !current_branch!
if %errorlevel% equ 0 (
    call :print_success "Successfully pushed to GitHub! 🎉"
    
    REM Try to get the remote URL for display
    for /f "tokens=*" %%i in ('git remote get-url origin 2^>nul') do set remote_url=%%i
    if not "!remote_url!"=="" (
        call :print_info "Repository URL: !remote_url:.git=!"
    )
) else (
    call :print_error "Failed to push to GitHub"
    call :print_info "Common solutions:"
    call :print_info "1. Make sure the repository exists on GitHub"
    call :print_info "2. Check your internet connection"
    call :print_info "3. Verify your GitHub credentials"
    call :print_info "4. Try: git push origin !current_branch! --force (if needed)"
)
goto :eof

REM =============================================================================
REM BUILD PROCESS
REM =============================================================================

:detect_project_type
if exist "package.json" (
    set "project_type=nodejs"
) else if exist "index.html" (
    set "project_type=static"
) else (
    set "project_type=unknown"
)
goto :eof

:build_project
call :print_step "Building project..."

call :detect_project_type

if "!project_type!"=="nodejs" (
    call :print_info "Node.js project detected"
    
    if exist "package.json" (
        call :print_step "Installing dependencies..."
        npm install
        
        REM Check if build script exists
        findstr /c:"\"build\"" package.json >nul 2>&1
        if %errorlevel% equ 0 (
            call :print_step "Running build script..."
            npm run build
            
            if %errorlevel% equ 0 (
                call :print_success "Build completed successfully!"
            ) else (
                call :print_warning "Build command failed"
                call :print_info "You may need to fix build errors before deploying"
            )
        ) else (
            call :print_info "No build script found in package.json"
        )
    )
) else if "!project_type!"=="static" (
    call :print_info "Static HTML project detected"
    call :print_success "No build process needed for static files"
) else (
    call :print_info "Unknown project type, skipping build"
)
goto :eof

REM =============================================================================
REM VERCEL DEPLOYMENT
REM =============================================================================

:deploy_to_vercel
call :print_step "Deploying to Vercel..."

vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    call :print_warning "Vercel CLI not found"
    call :show_manual_vercel_instructions
    goto :eof
)

REM Check login status
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    call :print_step "Logging in to Vercel..."
    vercel login
)

REM Get logged in user
for /f "tokens=*" %%i in ('vercel whoami 2^>nul') do set vercel_user=%%i
call :print_info "Logged in as: !vercel_user!"

REM Deploy to production
call :print_step "Starting Vercel deployment..."

vercel --prod
if %errorlevel% equ 0 (
    call :print_success "Successfully deployed to Vercel! 🚀"
    
    REM Try to get deployment info
    call :print_info "Getting deployment info..."
    vercel ls 2>nul
) else (
    call :print_error "Vercel deployment failed"
    call :print_info "Try deploying manually or check the error messages above"
)
goto :eof

:show_manual_vercel_instructions
call :print_info "Manual Vercel deployment steps:"
echo.
echo %CYAN%1. Install Vercel CLI: %NC%npm i -g vercel
echo %CYAN%2. Or use web interface:%NC%
echo    • Go to https://vercel.com
echo    • Sign in with GitHub
echo    • Click 'New Project'
echo    • Import your GitHub repository
echo    • Configure build settings if needed
echo    • Deploy!
echo.
goto :eof

REM =============================================================================
REM STATUS AND SUMMARY
REM =============================================================================

:show_deployment_status
call :print_separator
call :print_step "🎉 Deployment Summary"
echo.

echo %GREEN%✅ Project: %PROJECT_NAME%
echo ✅ Repository: %GITHUB_REPO_NAME%

for /f "tokens=*" %%i in ('git branch --show-current 2^>nul') do set current_branch=%%i
echo ✅ Branch: !current_branch!

for /f "tokens=*" %%i in ('git log -1 --pretty^=format:"%%h - %%s" 2^>nul') do set last_commit=%%i
echo ✅ Last commit: !last_commit!
echo.

REM Show links if available
for /f "tokens=*" %%i in ('git remote get-url origin 2^>nul') do set remote_url=%%i
if not "!remote_url!"=="" (
    echo 🔗 GitHub: !remote_url:.git=!
)

echo 🌐 Vercel: https://your-project.vercel.app%NC%
echo.

echo %CYAN%✨ Features deployed:
echo    • Gaming topup platform with 5 categories
echo    • Interactive portfolio showcase  
echo    • Search and filtering system
echo    • Transaction checking
echo    • Leaderboard system
echo    • Responsive design
echo    • Modern animations
echo    • Dark/Light theme toggle%NC%
echo.
goto :eof

:show_next_steps
call :print_step "🚀 Next Steps"
echo.
echo %YELLOW%1. Verify deployment:
echo    • Check GitHub repository
echo    • Test Vercel deployment
echo    • Verify all features work
echo.
echo 2. Customize content:
echo    • Update portfolio information
echo    • Add your projects and skills
echo    • Configure contact details
echo.
echo 3. Optional improvements:
echo    • Set up custom domain
echo    • Configure analytics
echo    • Add more games/features
echo    • Optimize performance%NC%
echo.
goto :eof

REM =============================================================================
REM COMMAND HANDLERS
REM =============================================================================

:full_deploy
call :print_header
call :print_step "🚀 Starting full deployment process..."

REM Pre-deployment checks
call :check_requirements
call :setup_git_config

REM Project setup
call :setup_gitignore
call :create_readme

REM Git initialization
call :init_git_repo

REM Optional build process
echo.
choice /C YN /M "Run build process"
if %errorlevel% equ 1 call :build_project

REM Git operations
call :add_and_commit "%COMMIT_MESSAGE%"
call :setup_github_remote
call :push_to_github

if %errorlevel% neq 0 (
    call :print_error "GitHub deployment failed. Fix issues and try again."
    pause
    exit /b 1
)

REM Vercel deployment
echo.
choice /C YN /M "Deploy to Vercel now" /D Y
if %errorlevel% equ 1 call :deploy_to_vercel

REM Show results
call :show_deployment_status
call :show_next_steps

call :print_success "🎉 Full deployment process completed!"
pause
goto :eof

:quick_deploy
call :print_header
call :print_step "⚡ Quick Deploy Mode"

set "commit_msg=%COMMIT_MESSAGE%"
if "!commit_msg!"=="" (
    set "commit_msg=⚡ Quick deploy: %date% %time%"
)

REM Quick checks
if not exist ".git" (
    call :print_error "Not a git repository. Run 'full' deploy first."
    pause
    exit /b 1
)

git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    call :print_error "No remote configured. Run 'full' deploy first."
    pause
    exit /b 1
)

REM Quick deploy process
call :print_step "Quick deploying changes..."

call :add_and_commit "!commit_msg!"
git push

if %errorlevel% equ 0 (
    call :print_success "⚡ Quick deploy completed!"
    call :print_info "Changes pushed to GitHub successfully"
    
    REM Ask about Vercel
    choice /C YN /M "Deploy to Vercel too"
    if %errorlevel% equ 1 call :deploy_to_vercel
) else (
    call :print_error "Quick deploy failed"
)

pause
goto :eof

:update_only
call :print_header
call :print_step "📝 Update Only Mode"

set "commit_msg=%COMMIT_MESSAGE%"
if "!commit_msg!"=="" (
    set /p commit_msg="Enter commit message: "
    if "!commit_msg!"=="" (
        set "commit_msg=📝 Update: %date% %time%"
    )
)

call :add_and_commit "!commit_msg!"

git push
if %errorlevel% equ 0 (
    call :print_success "📝 Updates pushed to GitHub!"
) else (
    call :print_error "Failed to push updates"
)

pause
goto :eof

:show_help
call :print_header
echo %CYAN%WEB TOPUP DEPLOY SCRIPT - USAGE GUIDE
echo =============================================
echo.
echo BASIC USAGE:
echo   deploy.bat [command] [commit-message]
echo.
echo COMMANDS:
echo   full     - Complete deployment process (default)
echo   quick    - Quick push to existing repository
echo   update   - Update existing deployment
echo   help     - Show this help message
echo.
echo EXAMPLES:
echo   deploy.bat full "Initial deployment"
echo   deploy.bat quick "Bug fixes"
echo   deploy.bat update "Updated portfolio"
echo   deploy.bat help
echo.
echo FEATURES:
echo   ✅ Automatic Git repository setup
echo   ✅ GitHub remote configuration
echo   ✅ Vercel deployment integration
echo   ✅ Build process automation
echo   ✅ Comprehensive .gitignore setup
echo   ✅ Professional README.md creation
echo   ✅ Error handling and validation
echo.
echo REQUIREMENTS:
echo   • Git (required)
echo   • Node.js (optional, for build process)
echo   • Vercel CLI (optional, for auto-deploy)
echo.
echo FIRST TIME SETUP:
echo   1. Save as deploy.bat in your project folder
echo   2. deploy.bat full "Initial commit"
echo   3. Follow the prompts
echo.
echo QUICK UPDATES:
echo   deploy.bat quick "Your update message"
echo %NC%
pause
goto :eof

REM =============================================================================
REM MAIN ENTRY POINT
REM =============================================================================

:main
REM Handle different commands
if /i "%COMMAND%"=="full" goto full_deploy
if /i "%COMMAND%"=="" goto full_deploy
if /i "%COMMAND%"=="quick" goto quick_deploy
if /i "%COMMAND%"=="update" goto update_only
if /i "%COMMAND%"=="help" goto show_help
if /i "%COMMAND%"=="-h" goto show_help
if /i "%COMMAND%"=="--help" goto show_help

REM Unknown command
call :print_error "Unknown command: %COMMAND%"
echo.
goto show_help

REM Jump to main function
goto main