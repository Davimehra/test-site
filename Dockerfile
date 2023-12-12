FROM node:alpine

RUN mkdir -p /usr/test/client

WORKDIR /usr/test/client

COPY package.json .

RUN npm install --only=prod

COPY . .

CMD ["npm","start"]
