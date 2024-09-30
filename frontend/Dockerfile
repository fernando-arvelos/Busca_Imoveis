# Dockerfile.frontend
FROM node:20.17.0-alpine
WORKDIR /app
COPY ../docker/frontend /app
RUN npm install
CMD ["npm", "start"]
