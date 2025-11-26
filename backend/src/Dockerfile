# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose port (Must match your server.js port)
EXPOSE 5000

# Start command
CMD ["npm", "start"]