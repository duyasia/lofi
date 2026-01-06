# Multi-stage build for React app
# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install dependencies with legacy peer deps flag
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS production

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/build ./build

# Copy package.json for serve command
COPY --from=builder /app/package.json ./

# Expose port (default 4000, can be overridden with PORT env var)
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || '4000'), (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the server
CMD ["sh", "-c", "serve -s build -l ${PORT:-4000}"]

