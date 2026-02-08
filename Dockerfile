FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM caddy:2-alpine

RUN apk add --no-cache python3 py3-pip

WORKDIR /app

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir --break-system-packages -r requirements.txt

COPY backend/ ./backend/
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
