FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY tsconfig.json ./tsconfig.json

COPY ./prisma/ ./prisma/

RUN mkdir ./doc

RUN npm run build 

EXPOSE ${SERVER_PORT}

CMD ["npm", "run", "start:docker"]