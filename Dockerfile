FROM node:22.19.0-alpine

RUN apk add --no-cache curl

RUN npm install pm2 -g
RUN pm2 update
RUN pm2 install pm2-logrotate

RUN pm2 set pm2-logrotate:max_size 10M 
RUN pm2 set pm2-logrotate:retain 2
RUN pm2 set pm2-logrotate:compress true
RUN pm2 set pm2-logrotate:rotateInterval '0 0 * * *'
RUN pm2 set pm2-logrotate:dateFormat 'YYYY-MM-DD'

WORKDIR /app

COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public
COPY ecosystem.config.cjs ./

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

RUN chown -R nextjs:nextjs /app

USER nextjs

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]