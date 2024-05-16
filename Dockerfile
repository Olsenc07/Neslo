# Step 1: Build Backend & Angular SSR
FROM node:18.20.2 as build-step

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install any needed packages specified in package*.json
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Run npm build command to build the Angular application
RUN npm run build

# Step 2: Setup the server using the same Node.js image
FROM node:18.20.2

# Set the working directory in this new stage
WORKDIR /app

# Copy the built application from the previous step
COPY --from=build-step /app/dist /app/dist
COPY --from=build-step /app/backend /app/backend
COPY --from=build-step /app/node_modules /app/node_modules
COPY --from=build-step /app/package*.json ./

# Install system dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libpango-1.0-0 \
    libxss1 \
    libgbm1 \
    libgtk-3-0 \
    libcairo2 \
    libc6 \
    libcairo-gobject2 \
    libjpeg62-turbo \
    libpng16-16 \
    libasound2 \
    libpangocairo-1.0-0 \
    libpangoft2-1.0-0 \
    libxi6 \
    libsm6 \
    libicu-dev \
    libxtst6 \
    libxshmfence1 \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-symbola \
    fonts-noto \
    fonts-freefont-ttf \
    && rm -rf /var/lib/apt/lists/*

# Add Google Chrome's repository to the sources list
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable

# Install Puppeteer
RUN npm install puppeteer

# Set the Chrome executable path for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

# Expose port 4200 to the outside once the container has launched
EXPOSE 4200

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "dist/server/server.mjs"]
