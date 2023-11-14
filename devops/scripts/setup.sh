#!/bin/bash

# Setup script for Elysium OS development environment

echo "Starting setup for Elysium OS..."

# Update and upgrade the system packages
echo "Updating system packages..."
sudo apt-get update && sudo apt-get upgrade -y

# Install Docker if not already installed
if [ ! $(which docker) ]; then
    echo "Installing Docker..."
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
fi

# Install Kubernetes (minikube) if not already installed
if [ ! $(which minikube) ]; then
    echo "Installing Kubernetes (minikube)..."
    curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
    chmod +x minikube
    sudo mv minikube /usr/local/bin/
fi

# Install kubectl if not already installed
if [ ! $(which kubectl) ]; then
    echo "Installing kubectl..."
    curl -LO "https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl"
    chmod +x ./kubectl
    sudo mv ./kubectl /usr/local/bin/kubectl
fi

# Start minikube
echo "Starting minikube..."
minikube start

# Set Docker to use minikube's Docker daemon
echo "Configuring Docker to use minikube's Docker daemon..."
eval $(minikube docker-env)

# Build the Docker images
echo "Building Docker images..."
docker build -t elysium-frontend:latest -f devops/docker/Dockerfile frontend/
docker build -t elysium-backend:latest -f devops/docker/Dockerfile backend/

# Apply Kubernetes configurations
echo "Applying Kubernetes configurations..."
kubectl apply -f devops/kubernetes/deployment.yaml
kubectl apply -f devops/kubernetes/service.yaml

# Install Node.js and npm if not already installed
if [ ! $(which node) ] || [ ! $(which npm) ]; then
    echo "Installing Node.js and npm..."
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install project dependencies
echo "Installing project dependencies..."
cd frontend && npm install
cd ../backend && npm install

# Setup complete
echo "Elysium OS setup complete. Ready for development!"