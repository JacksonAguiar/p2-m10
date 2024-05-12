# Use a imagem oficial do Node.js como base
FROM node:latest

WORKDIR /usr/src/app

COPY nodejs/package*.json ./
COPY nodejs/tsoa.json ./
COPY nodejs/tsconfig.json ./

RUN npm install

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
