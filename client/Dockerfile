# Choose a base image with Node.js
FROM node:20

# Create app directory in Docker
WORKDIR /usr/src/app

# Accept build arguments for environment variables and set them
ARG VITE_NODE_ENV
ARG VITE_API_URL
ARG VITE_HOST_URL

ENV VITE_NODE_ENV=${VITE_NODE_ENV}
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_HOST_URL=${VITE_HOST_URL}

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install app dependencies
RUN npm install --legacy-peer-deps

# Bundle app source
COPY . .

# Build the app; this step uses the environment variables
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Install 'serve' to serve the app
RUN npm install -g serve

# Command to serve your static files
CMD ["serve", "-s", "dist", "-l", "3000"]
