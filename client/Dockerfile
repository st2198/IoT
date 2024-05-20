# Use the official Node.js image with version 20.13.1
FROM node:20.13.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the necessary Expo ports
EXPOSE 19001

# Start the Expo server
CMD ["npx", "expo", "start"]
