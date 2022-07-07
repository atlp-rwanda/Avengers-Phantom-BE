FROM node:alpine

WORKDIR /avengersphantom-be
COPY package.json ./

COPY package-lock.json ./
COPY . .
RUN npm install
ENV NODE_ENV=docker
COPY ./models/index.js ./
COPY ./config.env ./

CMD ["npm","run","start:dev"]