FROM node:12

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

ENV NODE_ENV=production

RUN yarn build

CMD [ "yarn","start" ]