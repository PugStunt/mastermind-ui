FROM node:boron
MAINTAINER PugStunt

RUN mkdir -p /app

WORKDIR /app
COPY . /app

ENV API_HOST 'http://api.com/'

RUN echo "angular.module('mastermindUi').constant('api', '$API_HOST');" > /app/src/build.constant.js

RUN npm install  && \
  npm install -g gulp bower http-server && \
  bower --allow-root i && \
  gulp build

EXPOSE 8080

CMD hs /app/dist
