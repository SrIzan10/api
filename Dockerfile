FROM node:alpine

COPY . /server

WORKDIR /server

RUN npm i

EXPOSE 7272

CMD tsc --watch;node dist/index.js