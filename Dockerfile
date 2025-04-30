# Use full Node.js image instead of Alpine
FROM node:18

# Install dependencies for node-gyp and canvas
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    librsvg2-dev

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
