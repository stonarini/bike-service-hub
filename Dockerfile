FROM node:alpine

WORKDIR /var/www

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["node", "./bin/www"] 