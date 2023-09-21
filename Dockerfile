FROM node:18-alpine As Build

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN yarn global add @nestjs/cli@10.1.7

COPY --chown=node:node package.json yarn.lock tsconfig.json tsconfig.build.json .env nest-cli.json ./

ARG NPM_TOKEN

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc && \
    yarn install --production=true --frozen-lockfile && \
    rm -f .npmrc && \
    yarn cache clean

COPY --chown=node:node ./src ./src

RUN yarn run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN apk add dumb-init

WORKDIR /usr/src/app

COPY --chown=node:node --from=Build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=Build /usr/src/app/dist/ /usr/src/app/.env ./

USER node

CMD ["dumb-init", "node", "--max-old-space-size=1024", "main" ]
EXPOSE 80
