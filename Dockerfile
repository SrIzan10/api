FROM node:alpine

COPY package.json /server

WORKDIR /server

RUN apk add python make gcc g++

RUN npm i

RUN npm i -g typescript

EXPOSE 7272

COPY . /server

CMD tsc --build;node dist/index.js