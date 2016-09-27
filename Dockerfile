FROM mhart/alpine-node:6

ENV APP_DIR=/opt/client
ENV NODE_ENV=production

# NPM package cache
COPY package.json /tmp/package.json
RUN \
    cd /tmp && \
    npm install --production && \
    npm cache clean

RUN \
  mkdir -p ${APP_DIR} && \
  mkdir ${APP_DIR}/log && \
  cp -a /tmp/node_modules/ ${APP_DIR}

# Application setup
COPY package.json ${APP_DIR}/package.json
COPY . ${APP_DIR}

RUN addgroup www-data
RUN adduser -G www-data -D -H www-data
RUN chown -R www-data:www-data ${APP_DIR}

USER www-data

WORKDIR ${APP_DIR}

CMD ["node", "."]

