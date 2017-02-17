FROM node:latest
MAINTAINER rochapaulo

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY . /usr/src/app
COPY package.json /usr/src/app/package.json

RUN npm install -y
RUN npm install -g -y gulp
RUN npm install -g -y bower

EXPOSE 3000 3001
CMD ["gulp", "serve"]
