#!/bin/bash

# =============================================================================
# 🚀 GIT BASH DEPLOY SCRIPT - WEB TOPUP TO GITHUB & VERCEL
# =============================================================================
# Author: Auto Deploy Script
# Description: Deploy Web Topup project to GitHub and Vercel (Git Bash/Linux)
# Usage: ./deploy.sh [command] [commit-message]
# Commands: full, quick, update, help
# =============================================================================

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Project configuration
PROJECT_NAME="Project Web Topup"
GITHUB_REPO_NAME="web-topup-portfolio"
VERCEL_PROJECT_NAME="web-topup"
DEFAULT_BRANCH="main"

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

print_header() {
    echo ""
    echo -e "${PURPLE}==============================================="
    echo "🚀 WEB TOPUP DEPLOY SCRIPT"
    echo "===============================================${NC}"
    echo ""
}

print_step() {
    echo -e "${BLUE}📍 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ Error: $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

# =============================================================================
# QUICK DEPLOY FUNCTIONS
# =============================================================================

quick_deploy() {
    local commit_message="$1"
    
    print_header
    print_step "⚡ Quick Deploy Mode"
    
    if [ -z "$commit_message" ]; then
        commit_message="⚡ Quick deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    # Quick checks
    if [ ! -d ".git" ]; then
        print_error "Not a git repository. Run 'full' deploy first."
        return 1
    fi
    
    if ! git remote get-url origin >/dev/null 2>&1; then
        print_error "No remote configured. Run 'full' deploy first."
        return 1
    fi
    
    # Quick deploy process
    print_step "Quick deploying changes..."
    
    git add .
    git commit -m "$commit_message"
    git push
    
    if [ $? -eq 0 ]; then
        print_success "⚡ Quick deploy completed!"
        print_info "Changes pushed to GitHub successfully"
    else
        print_error "Quick deploy failed"
        return 1
    fi
}

update_only() {
    local commit_message="$1"
    
    print_header
    print_step "📝 Update Only Mode"
    
    if [ -z "$commit_message" ]; then
        read -p "Enter commit message: " commit_message
        if [ -z "$commit_message" ]; then
            commit_message="📝 Update: $(date '+%Y-%m-%d %H:%M:%S')"
        fi
    fi
    
    git add .
    git commit -m "$commit_message"
    
    if git push; then
        print_success "📝 Updates pushed to GitHub!"
    else
        print_error "Failed to push updates"
        return 1
    fi
}

full_deploy() {
    local commit_message="$1"
    
    print_header
    print_step "🚀 Starting full deployment process..."
    
    # Check Git
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        return 1
    fi
    
    # Initialize git if needed
    if [ ! -d ".git" ]; then
        print_step "Initializing Git repository..."
        git init
        git branch -M main
        print_success "Git repository initialized"
    fi
    
    # Setup .gitignore
    if [ ! -f ".gitignore" ]; then
        print_step "Creating .gitignore..."
        cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
.next/
.nuxt/
.output/

# Environment variables
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Vercel
.vercel

# Temporary files
tmp/
temp/
EOF
        print_success ".gitignore created"
    fi
    
    # Git config check
    if ! git config user.name >/dev/null 2>&1; then
        print_warning "Git user name not configured"
        read -p "Enter your full name: " user_name
        git config --global user.name "$user_name"
    fi
    
    if ! git config user.email >/dev/null 2>&1; then
        print_warning "Git user email not configured"
        read -p "Enter your email: " user_email
        git config --global user.email "$user_email"
    fi
    
    # Commit changes
    if [ -z "$commit_message" ]; then
        commit_message="🚀 Deploy: Web Topup with Portfolio integration - $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    print_step "Adding and committing files..."
    git add .
    git commit -m "$commit_message"
    
    # Setup GitHub remote
    if ! git remote get-url origin >/dev/null 2>&1; then
        print_step "Setting up GitHub remote..."
        read -p "Enter your GitHub username: " github_username
        
        if [ -z "$github_username" ]; then
            print_error "GitHub username is required"
            return 1
        fi
        
        read -p "Enter repository name [$GITHUB_REPO_NAME]: " repo_name
        repo_name=${repo_name:-$GITHUB_REPO_NAME}
        
        remote_url="https://github.com/$github_username/$repo_name.git"
        git remote add origin "$remote_url"
        
        print_success "Remote added: $remote_url"
        print_info "Make sure the repository exists on GitHub!"
    fi
    
    # Push to GitHub
    print_step "Pushing to GitHub..."
    current_branch=$(git branch --show-current 2>/dev/null || echo "main")
    
    if git push -u origin "$current_branch"; then
        print_success "Successfully pushed to GitHub! 🎉"
        
        # Ask about Vercel
        read -p "Deploy to Vercel now? (y/N): " deploy_vercel
        if [[ $deploy_vercel =~ ^[Yy]$ ]]; then
            if command -v vercel &> /dev/null; then
                print_step "Deploying to Vercel..."
                vercel --prod
                if [ $? -eq 0 ]; then
                    print_success "Successfully deployed to Vercel! 🚀"
                else
                    print_error "Vercel deployment failed"
                fi
            else
                print_warning "Vercel CLI not found. Install with: npm i -g vercel"
                print_info "Or deploy manually at: https://vercel.com"
            fi
        fi
        
        # Show summary
        echo ""
        print_success "🎉 Deployment completed!"
        print_info "GitHub: $(git remote get-url origin 2>/dev/null | sed 's/.git$//')"
        print_info "Project: $PROJECT_NAME"
        
    else
        print_error "Failed to push to GitHub"
        print_info "Make sure the repository exists and you have access"
        return 1
    fi
}

show_help() {
    print_header
    echo -e "${CYAN}WEB TOPUP DEPLOY SCRIPT - USAGE GUIDE"
    echo "============================================="
    echo ""
    echo "BASIC USAGE:"
    echo "  ./deploy.sh [command] [commit-message]"
    echo ""
    echo "COMMANDS:"
    echo "  full     - Complete deployment process (default)"
    echo "  quick    - Quick push to existing repository"
    echo "  update   - Update existing deployment"
    echo "  help     - Show this help message"
    echo ""
    echo "EXAMPLES:"
    echo "  ./deploy.sh full \"Initial deployment\""
    echo "  ./deploy.sh quick \"Bug fixes\""
    echo "  ./deploy.sh update \"Updated portfolio\""
    echo "  ./deploy.sh help"
    echo ""
    echo "FEATURES:"
    echo "  ✅ Automatic Git repository setup"
    echo "  ✅ GitHub remote configuration"
    echo "  ✅ Vercel deployment integration"
    echo "  ✅ Error handling and validation"
    echo ""
    echo "FIRST TIME SETUP:"
    echo "  1. chmod +x deploy.sh"
    echo "  2. ./deploy.sh full \"Initial commit\""
    echo "  3. Follow the prompts"
    echo ""
    echo "QUICK UPDATES:"
    echo "  ./deploy.sh quick \"Your update message\""
    echo -e "${NC}"
}

# =============================================================================
# MAIN ENTRY POINT
# =============================================================================

main() {
    local command="$1"
    local commit_message="$2"
    
    # Make script executable if it isn't
    if [ ! -x "$0" ]; then
        chmod +x "$0"
    fi
    
    case "$command" in
        "full"|"")
            full_deploy "$commit_message"
            ;;
        "quick")
            quick_deploy "$commit_message"
            ;;
        "update")
            update_only "$commit_message"
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            print_error "Unknown command: $command"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"