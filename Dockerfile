# Define the base image for the build stage
FROM node:20-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files to the working directory
COPY . .

# Build the application
RUN npm run build

# Use a lightweight base image for production
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy built files from the build stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Expose the port
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
