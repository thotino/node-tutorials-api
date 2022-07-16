FROM node:14-buster-slim

ENV APP_SERVER_PORT=3000

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY . /usr/app

RUN yarn install --production && yarn autoclean --init && yarn autoclean --force

RUN chmod +x docker-entrypoint.sh

ENTRYPOINT [ "./docker-entrypoint.sh" ]

EXPOSE 3000