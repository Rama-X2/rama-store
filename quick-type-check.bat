@echo off
cd "C:\rama.server.my.id\Project Web Topup"
echo Running TypeScript type check...
npx tsc --noEmit --skipLibCheck
echo Type check completed.
pause