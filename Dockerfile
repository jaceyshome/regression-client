#
# Regression test client docker image
#
# build:
#    docker build --force-rm -t jacobwang05/regression-client .
# push:
#    docker push jacobwang0/regression-client .
#

### BASE
FROM node:9.3.0-alpine AS base
LABEL maintainer "Jake Wang <jaceyshome@gmail.com>"
# Set the working directory
WORKDIR /home/node/app
COPY package.json ./

### DEPENDENCIES 
FROM base AS dependencies 
# Install ALL Node.js dependencies 
RUN npm install http-server

### RELEASE
FROM dependencies AS release
COPY . .
# Set the working directory user and group
# FIXME: set node user and group not working
#RUN chown node:node -R /home/node/app
# Set node user to run this image
#USER node
# Allow the logs directory to be mounted
ONBUILD VOLUME ["/home/node/app/dist"]
# Expose application port, production port is 7071
EXPOSE 7090
# In production environment
ENV NODE_ENV production
# Run the server
CMD ["npm", "run-script", "prod"]
