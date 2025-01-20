# Stage 1: Build frontend
FROM node:22 AS frontend-builder
WORKDIR /app/frontend

# Copy package.json and package-lock.json to install dependencies
COPY frontend/package.json frontend/package-lock.json ./

RUN npm install

# Copy the rest of the frontend code
COPY frontend/ .

# Run the build command
RUN npm run build

# Optionally, debug the build output by listing files
RUN ls -al /app/frontend/dist/

# Stage 2: Setup backend with frontend static files
FROM node:22
WORKDIR /app

# Copy entire backend directory (including package.json, package-lock.json, .env, etc.)
COPY backend/ ./backend/

# Install backend dependencies (including axios)
WORKDIR /app/backend
RUN npm install

RUN ls -al /app/backend/node_modules/axios

# Copy built frontend files
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

ENV PORT=3001  
EXPOSE 3001   

# Start the backend service and ensure to use the .env file
CMD ["npx", "nodemon", "--env-file", "/app/backend/.env", "/app/backend/server.js"]