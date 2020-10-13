# **
# * @name development
# * 
# * 
# **
FROM node:12.13-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install --only=development
RUN npm install 
#RUN yarn install --production=true

COPY . .

RUN npm run build
#RUN yarn run build


# **
# * @name production
# * 
# * 
# **
FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# ARG DB_CONNECTION_TOKEN
# ARG DB_URI
# ARG DB_TABLE_MODELS
# ARG REDIS_CONNECTION_TOKEN
# ARG REDIS_URL
# ARG REDIS_PLAYBOOK_STATES
# ARG RABBIT_URL
# ARG RABBIT_MS_STORAGE_SERVICE_NAME
# ARG RABBIT_MS_STORAGE_PRODUCE_QUEUE
# ARG RABBIT_MS_STORAGE_CONSUME_QUEUE
# ARG SOCKET_IO_URI

# ! this must be set 
# ENV DB_CONNECTION_TOKEN 
# ENV DB_URI
# ENV REDIS_CONNECTION_TOKEN
# ENV REDIS_URL
# ENV RABBIT_URL
# ENV RABBIT_MS_STORAGE_SERVICE_NAME
# ENV RABBIT_MS_STORAGE_PRODUCE_QUEUE
# ENV RABBIT_MS_STORAGE_CONSUME_QUEUE
# ENV SOCKET_IO_URI

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production
#RUN yarn install --production=true

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/src/main"]

# CMD ["dist/main"]
# ENTRYPOINT [ "node" ]


   