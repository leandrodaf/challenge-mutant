FROM node:12-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock ./

USER node

RUN yarn install

COPY --chown=node:node . .

RUN yarn build
RUN rm -rf src
RUN rm -rf node_modules

RUN yarn install --production

EXPOSE 8080

CMD [ "yarn", "serve" ]