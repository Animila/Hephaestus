FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

#RUN #npx prisma generate

EXPOSE 5000

CMD ["yarn", "start:prod"]