FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

#COPY prisma ./prisma/
#
#RUN npx prisma generate

RUN yarn build

COPY .env .env

EXPOSE 5000

CMD ["yarn", "start:prod"]