#
# Regression test client docker image
#
# build:
#    docker build --force-rm -t sydneyuni/regression-client .
# push:
#    docker push sydneyuni/regression-client .
#

### BASE
FROM node:9.3.0-alpine AS base
LABEL maintainer "Jake Wang <jake.wang@sydney.edu.au>"
# Set the working directory
WORKDIR /home/node/app
# Copy project specification and dependencies lock files
COPY package.json yarn.lock ./



### DEPENDENCIES
FROM base AS dependencies
# Install Node.js dependencies (only production)
RUN yarn --production
# Copy production dependencies aside
RUN cp -R node_modules /tmp/node_modules
# Install ALL Node.js dependencies
RUN yarn



### RELEASE
FROM base AS release
# Copy production dependencies
COPY --from=dependencies /tmp/node_modules ./node_modules
# Copy app sources
COPY . .
# Install node-sass dependency
RUN yarn add node-sass
# Create release build
RUN yarn build
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

