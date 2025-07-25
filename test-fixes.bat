#!/bin/bash

echo "====================================="
echo "  TESTING TYPESCRIPT FIXES"
echo "====================================="
echo

echo "[1/3] Running TypeScript check..."
cd "C:/rama.server.my.id/Project Web Topup"
npm run type-check

echo
echo "[2/3] Testing build process..."
npm run build

echo
echo "[3/3] Build test completed"
echo "====================================="