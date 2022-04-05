FROM node:17
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node ./app.js ./
COPY --chown=node:node ./config ./
COPY --chown=node:node ./microservices ./
COPY --chown=node:node ./semtech/dist ./
USER node
RUN npm install express
RUN npm install express-session
RUN npm install cors
RUN npm install keycloak-connect
RUN npm install axios

CMD ["node", "app.js"]