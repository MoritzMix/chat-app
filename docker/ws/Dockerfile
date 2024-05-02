# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ws/package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY ws/wsServer.js .

# Expose port 3001 for the app to listen on
EXPOSE 3001

USER node

# Start the application
CMD [ "node", "wsServer.js" ]