FROM node:20.0.0-alpine3.17

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV PNPM_HOME=/usr/local/bin

WORKDIR /app

COPY . .

RUN pnpm install --prod

RUN pnpm build

EXPOSE 3000

CMD pnpm start 