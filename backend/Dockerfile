FROM node:18
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 4000
CMD ["node", "dist/server.js"]