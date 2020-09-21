FROM node:14

ADD . /src

WORKDIR /src

COPY package*.json ./

COPY mongoInit.js /docker-entrypoint-initdb.d/

RUN npm install