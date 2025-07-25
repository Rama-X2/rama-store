#!/bin/bash

echo "=== Fixing Vercel Deployment Issues ==="
echo "Step 1: Type checking..."

# Run type check
npm run type-check

if [ $? -eq 0 ]; then
    echo "✅ Type check passed!"
    echo "Step 2: Building project..."
    
    # Build the project
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful!"
        echo "Step 3: Committing changes..."
        
        # Add and commit changes
        git add .
        git commit -m "Fix: Resolve framer-motion TypeScript errors for Vercel deployment"
        
        echo "Step 4: Pushing to GitHub..."
        git push origin main
        
        echo "🎉 All fixes applied successfully!"
        echo "Your project should now deploy correctly on Vercel."
    else
        echo "❌ Build failed. Please check the errors above."
    fi
else
    echo "❌ Type check failed. Please check the errors above."
fi
