FROM node:boron
MAINTAINER PugStunt

RUN mkdir -p /app

WORKDIR /app
COPY . /app

ENV API_HOST 'http://api.com/'

RUN sed -i "s#/api#$API_HOST#" /app/src/app/index.constants.js

RUN npm install  && \
  npm install -g gulp bower http-server && \
  bower --allow-root i && \
  gulp build

EXPOSE 8080

CMD hs /app/dist
