FROM node:12

WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install \
  && apt-get update \
  && apt-get install -y postgresql-client

COPY .env.develop ./
COPY .env.production ./
COPY src ./src
COPY schema.gql ./
COPY nodemon.json ./
COPY nodemon-debug.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./
COPY start-node.sh ./

EXPOSE 3005

RUN yarn build
