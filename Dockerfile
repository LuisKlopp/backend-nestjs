FROM node:20
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["node", "dist/main.js"]