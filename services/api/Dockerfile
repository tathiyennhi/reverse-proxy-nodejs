FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Make port 9797 available to the world outside this container
EXPOSE 9797

# Define environment variable
ENV NODE_ENV production

# Run app.js when the container launches
CMD ["node", "app.js"]
