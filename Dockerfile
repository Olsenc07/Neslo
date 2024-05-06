# Build Backend & Angular SSR
FROM node:18.20.2 as build-step
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Setup the server
FROM node:18.20.2

WORKDIR /app

# Copy the built application from the previous step
COPY --from=build-step /app/dist /app/dist
COPY --from=build-step /app/backend /app/backend
COPY --from=build-step /app/node_modules /app/node_modules
COPY --from=build-step /app/package*.json ./

EXPOSE 4200

# Argument to accept the commit SHA
# ARG GITHUB_SHA

# Use the GITHUB_SHA to tag the server or use it within the application
# ENV GITHUB_SHA_ENV=$GITHUB_SHA

# Run the server
CMD ["node", "dist/server/server.mjs"]