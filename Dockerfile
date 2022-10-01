FROM node:alpine

COPY . /server

WORKDIR /server

RUN npm i

RUN npm i -g typescript

EXPOSE 7272

CMD tsc --watch;node dist/index.js