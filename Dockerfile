FROM node:20.11.1-alpine as development

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps --force

# Build the application
RUN npm run build

# FROM node:20.11.1-alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /app

# COPY --from=development /app/ecosystem.config.js /app/ecosystem.config.js
# COPY --from=development /app/.next /app/.next
# COPY --from=development /app/pages /app/pages/
# COPY --from=development /app/.env /app/.env
# COPY --from=development /app/package.json /app/package.json
# COPY --from=development /app/package-lock.json /app/package-lock.json


# Install pm2 globally
RUN npm install -g pm2

# Create a group and user
#RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Change ownership of the application files
#RUN chown -R appuser:appgroup /app

# Switch to the new user
#USER appuser

# Specify the command to run the application
CMD ["pm2-runtime", "start", "ecosystem.config.js"]