
FROM node:20.11.1-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm install -g pm2
RUN npm run build

COPY . .

COPY .next /app/.next

# Bundle app source
# Create a group and user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN chown -R appuser:appgroup /app
# Tell docker that all future commands should run as the appuser user
USER appuser

#CMD ["node", "dist/main", "pm2-runtime", "start", "ecosystem.config.js"]
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
