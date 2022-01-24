FROM node:16.13.2-alpine3.14 AS builder

WORKDIR /usr/src/app

COPY *.ts *.json *.lock ./

RUN yarn install --frozen-lockfile && \
    yarn build && \
    yarn install --production=true --frozen-lockfile

FROM node:16.13.2-alpine3.14 AS runner

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist/
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/

ENV PATH $PATH:/usr/src/app/node_modules/.bin

ENV REGISTRY registry2.balena-cloud.com
ENV PORT 5000
ENV CUSTOM_PLUGINS dist/plugin.js
ENV HTTP false

ENTRYPOINT ["container-registry-proxy"]
