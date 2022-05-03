FROM node:alpine

WORKDIR /app

# COPY package.json
COPY package*.json ./

RUN npm install

# COPY
COPY . .

# Run and expose the server on port 3000
EXPOSE 3000

RUN ls
# A command to start the server
CMD npm start