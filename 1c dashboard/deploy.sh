#!/bin/bash
# Deploy script - serverda ishlatish uchun
# Serverdagi frontend papkasida bajaring:

echo "📦 Git pull..."
git pull

echo "🔧 Building..."
npm run build

echo "🔄 Restarting PM2..."
pm2 restart frontend 2>/dev/null || pm2 start "npx serve -s dist -l 40080" --name frontend

echo "✅ Deploy tugadi!"
pm2 status
