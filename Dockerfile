FROM node:18.18.2-alpine
WORKDIR /src
COPY . ./
RUN npm install -g npm@10.2.1
RUN npm install
RUN npm run build
RUN npm prune --production
CMD [ "npm", "run", "start:dist" ]
EXPOSE 80
