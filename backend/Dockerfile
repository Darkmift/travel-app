# Build stage
FROM node:20-alpine AS Build

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

# Production stage
FROM node:20-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN apk add dumb-init

WORKDIR /usr/src/app

# Copy from build stage
COPY --chown=node:node --from=Build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=Build /usr/src/app/dist/ /usr/src/app/.env ./

# Here's the crucial part: you change the ownership of the WORKDIR to the 'node' user.
# This command gives the 'node' user the ability to create, modify, and delete files and directories within /usr/src/app
RUN chown -R node:node /usr/src/app

# Switching to user 'node' for better security during runtime
USER node

CMD ["dumb-init", "node", "--max-old-space-size=1024", "main"]
EXPOSE 80
