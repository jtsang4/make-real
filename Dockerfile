# Define the base image for the build stage
FROM ubuntu:22.04 as base

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update

RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

# 安装 Python3 和 pip
RUN apt-get install -y python3-pip

RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*

FROM base as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files to the working directory
COPY . .

ENV DATABASE_URL="file:/app/data/db.sqlite"

# Build the application
RUN npm run db:generate && npm run build

# Use a lightweight base image for production
FROM base as runner

ENV DATABASE_URL="file:/app/data/db.sqlite"

# Set the working directory
WORKDIR /app

# Copy built files from the build stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/data/db.sqlite ./data/db.sqlite

# Expose the port
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "prod"]
