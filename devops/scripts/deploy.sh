#!/bin/bash

# Deployment script for Elysium OS on Kubernetes

# Set the namespace for the deployment
NAMESPACE=elysium-os

# Check if the namespace exists, and create it if it doesn't
if ! kubectl get namespace "$NAMESPACE" > /dev/null 2>&1; then
    kubectl create namespace "$NAMESPACE"
fi

# Deploy the Docker containers to Kubernetes
echo "Deploying Elysium OS to Kubernetes..."
kubectl apply -f ../kubernetes/deployment.yaml --namespace="$NAMESPACE"
kubectl apply -f ../kubernetes/service.yaml --namespace="$NAMESPACE"

# Verify the deployment
echo "Verifying deployment..."
kubectl rollout status deployment/elysium-os-deployment --namespace="$NAMESPACE"

# If the deployment is successful, print the IP and Port to access the application
if [ $? -eq 0 ]; then
    APP_IP=$(kubectl get service elysium-os-service --namespace="$NAMESPACE" -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
    APP_PORT=$(kubectl get service elysium-os-service --namespace="$NAMESPACE" -o jsonpath='{.spec.ports[0].port}')
    echo "Elysium OS deployed successfully!"
    echo "Access the application at http://$APP_IP:$APP_PORT"
else
    echo "Deployment failed. Please check the logs for more details."
fi

# Run database migrations
echo "Running database migrations..."
kubectl exec -it $(kubectl get pods --namespace="$NAMESPACE" -l app=elysium-os -o jsonpath='{.items[0].metadata.name}') --namespace="$NAMESPACE" -- node backend/src/migrations/migrate.js

echo "Deployment script execution completed."