# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# Build stage
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:16 AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json ./
COPY --from=build /app/dist /app/dist
RUN npm ci --only=production
RUN npm install -g @nestjs/cli
CMD ["npm", "run", "start:prod"]