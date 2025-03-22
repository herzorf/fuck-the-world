#!/bin/bash

# 服务器信息
SERVER_USER="root"
SERVER_HOST="42.192.105.150"
DEPLOY_DIR="/usr/share/nginx/html"
TAR_FILE="docs.tar.gz"

echo "🚀 正在构建前端项目..."
pnpm run build || { echo "❌ 前端打包失败！"; exit 1; }

echo "📦 正在压缩 dist 目录..."
tar -czf $TAR_FILE -C docs .

# 5. 上传压缩包到服务器
echo "📤 正在上传 dist.tar.gz 到服务器..."
scp $TAR_FILE $SERVER_USER@$SERVER_HOST:$DEPLOY_DIR/

# 6. 远程连接服务器，解压并移动到部署目录
echo "🔧 正在远程部署..."
ssh $SERVER_USER@$SERVER_HOST <<EOF
  # 进入根目录
  cd $DEPLOY_DIR

  # 解压 dist.tar.gz
  tar -xzf $TAR_FILE

  # 清理服务器上的压缩包和临时目录
  rm -rf  $TAR_FILE

  echo "✅ 部署完成！"
EOF

# 7. 删除本地压缩包
rm -f docs.tar.gz
echo "🧹 本地清理完成！"

echo "🎉 前端自动部署完成！"
