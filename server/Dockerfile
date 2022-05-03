FROM node:alpine

WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

RUN ls

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

# COPY ENV variable
COPY .env ./

# Run and expose the server on port 3000
EXPOSE 3000

RUN ls
# A command to start the server
CMD npm start