@echo off
echo === Fixing Vercel Deployment Issues ===
echo Step 1: Type checking...

REM Run type check
call npm run type-check

if %errorlevel% equ 0 (
    echo ✅ Type check passed!
    echo Step 2: Building project...
    
    REM Build the project
    call npm run build
    
    if %errorlevel% equ 0 (
        echo ✅ Build successful!
        echo Step 3: Committing changes...
        
        REM Add and commit changes
        git add .
        git commit -m "Fix: Resolve framer-motion TypeScript errors for Vercel deployment"
        
        echo Step 4: Pushing to GitHub...
        git push origin main
        
        echo 🎉 All fixes applied successfully!
        echo Your project should now deploy correctly on Vercel.
    ) else (
        echo ❌ Build failed. Please check the errors above.
    )
) else (
    echo ❌ Type check failed. Please check the errors above.
)

pause
