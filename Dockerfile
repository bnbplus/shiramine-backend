FROM node:12

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get -y install mysql-client

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]