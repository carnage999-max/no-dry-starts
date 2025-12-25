#!/bin/bash
# EC2 Bootstrap Script for No Dry Starts
# Run this on EC2 instance to set up Docker, Docker Compose, and dependencies

set -e

echo "=========================================="
echo "No Dry Starts - EC2 Bootstrap Setup"
echo "=========================================="

# Update system
echo "[1/6] Updating system packages..."
sudo yum update -y
sudo yum install -y git curl wget vim htop

# Install Docker
echo "[2/6] Installing Docker..."
sudo amazon-linux-extras install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Install Docker Compose
echo "[3/6] Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installations
echo "[4/6] Verifying installations..."
docker --version
docker-compose --version

# Create app directory
echo "[5/6] Creating application directory..."
sudo mkdir -p /opt/nds
sudo chown -R ec2-user:ec2-user /opt/nds
cd /opt/nds

# Clone repository (update with your repo URL if private)
echo "[6/6] Cloning repository..."
git clone https://github.com/your-username/no-dry-starts.git .

echo ""
echo "=========================================="
echo "Bootstrap completed successfully!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Copy .env.production to the instance:"
echo "   scp -i membership-auto-key.pem .env.production ec2-user@3.236.59.11:/opt/nds/"
echo ""
echo "2. SSH into the instance:"
echo "   ssh -i membership-auto-key.pem ec2-user@3.236.59.11"
echo ""
echo "3. Download ACM certificates (see AWS setup guide)"
echo ""
echo "4. Start services:"
echo "   cd /opt/nds"
echo "   docker-compose up -d"
echo ""
echo "5. Check logs:"
echo "   docker-compose logs -f"
echo ""
