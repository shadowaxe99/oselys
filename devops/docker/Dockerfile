# Use an official Node runtime as a parent image
FROM node:14-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any dependencies
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Make port 3000 available for the app
EXPOSE 3000

# Define environment variable for Node.js
ENV NODE_ENV=production

# Run the app when the container launches
CMD ["node", "backend/src/server.js"]