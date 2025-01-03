FROM node:20-alpine
USER node
WORKDIR /usr/local/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","start:dev"]