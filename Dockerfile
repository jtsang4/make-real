# Define the base image for the build stage
FROM ubuntu:22.04 as base

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update

# Install Node.js and Python
RUN apt-get install -y curl && \
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
  apt-get install -y nodejs && \
  apt-get install -y python3-pip

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

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
ENV NEXT_PUBLIC_VERCEL_ENV="production"

# Build the application
RUN npm run db:generate \
  && mkdir -p data && touch data/db.sqlite \
  && npm run build

# Use a lightweight base image for production
FROM base as runner

ENV DATABASE_URL="file:/app/data/db.sqlite"
ENV NEXT_PUBLIC_VERCEL_ENV="production"

# Set the working directory
WORKDIR /app

# Copy built files from the build stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/data/db.sqlite ./data/db.sqlite
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "prod"]
