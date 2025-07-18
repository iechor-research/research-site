#!/bin/bash

# Research CLI Website Deployment Script
echo "🚀 Starting deployment of Research CLI website..."

# Server configuration
SERVER_HOST="8.216.80.83"
SERVER_USER="root"
SERVER_PATH="/var/www/research-cli"

# Create server directory if it doesn't exist
echo "📁 Creating server directory..."
ssh ${SERVER_USER}@${SERVER_HOST} "mkdir -p ${SERVER_PATH}"

# Upload files to server
echo "📤 Uploading files to server..."
rsync -avz --delete dist/ ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/

# Set proper permissions
echo "🔧 Setting permissions..."
ssh ${SERVER_USER}@${SERVER_HOST} "chown -R www-data:www-data ${SERVER_PATH} && chmod -R 755 ${SERVER_PATH}"

# Install/configure nginx if needed
echo "🌐 Configuring nginx..."
ssh ${SERVER_USER}@${SERVER_HOST} "
# Install nginx if not present
if ! command -v nginx &> /dev/null; then
    apt update && apt install -y nginx
fi

# Create nginx configuration
cat > /etc/nginx/sites-available/research-cli << 'EOF'
server {
    listen 80;
    server_name _;
    root ${SERVER_PATH};
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control \"public, immutable\";
    }

    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/research-cli /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload nginx
nginx -t && systemctl reload nginx
systemctl enable nginx
systemctl start nginx
"

echo "✅ Deployment completed successfully!"
echo "🌍 Website should be available at: http://${SERVER_HOST}" 