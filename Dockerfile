FROM node:alpine

COPY . /server

WORKDIR /server

RUN npm i

EXPOSE 7272

CMD tsc --build;cd