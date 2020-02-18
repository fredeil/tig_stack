FROM node:10
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080

# Call the health endpoint on intervals
HEALTHCHECK --interval=10s --timeout=3s --retries=10 --start-period=30s CMD curl -f http://localhost/api/health || exit 1

CMD [ "node", "server.js" ]