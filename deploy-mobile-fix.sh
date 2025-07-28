#!/bin/bash

echo "===================================="
echo "MOBILE RESPONSIVENESS FIX DEPLOYMENT"  
echo "===================================="

echo ""
echo "[1/6] Adding all changes to git..."
git add .

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to add files to git"
    exit 1
fi

echo ""
echo "[2/6] Committing changes..."
git commit -m "Fix mobile responsiveness issues - optimize header, modal, grid layout, and inputs for mobile devices"

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to commit changes"
    exit 1
fi

echo ""
echo "[3/6] Pushing to main branch..."
git push origin main

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to push to git repository"
    exit 1
fi

echo ""
echo "[4/6] Verifying git status..."
git status

echo ""
echo "[5/6] Deploying to Vercel..."
npx vercel --prod

if [ $? -ne 0 ]; then
    echo "ERROR: Vercel deployment failed"
    exit 1
fi

echo ""
echo "[6/6] Deployment completed successfully!"
echo ""
echo "MOBILE FIXES APPLIED:"
echo "- Responsive header with mobile navigation"
echo "- Optimized game grid for mobile screens"
echo "- Mobile-friendly modal/popup layout"
echo "- Improved input components for touch devices"
echo "- Better spacing and typography scaling" 
echo "- Reduced animations for mobile performance"
echo ""
echo "Your website is now mobile-optimized!"
echo "Check your Vercel dashboard for the deployment URL."
echo ""
