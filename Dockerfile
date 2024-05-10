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

EXPOSE 4200

# Run the server
CMD ["node", "dist/server/server.mjs"]