#
# Regression tests code base
#
# test and development:
#    using docker-compose: docker-compose up --build
# build:
#    docker build --force-rm -t sydneyuni/regression-tests .
# push:
#    docker push sydneyuni/regression-tests .
#

### BASE
FROM httpd:2.4 AS base
# TODO may need to run as non-root user inside the docker container
# See https://vimeo.com/171803492 at 17:20 mark
# RUN groupadd -r nodejs && useradd -m -r -g nodejs nodejs
# now run as new user nodejs from group nodejs
# USER nodejs
### Display nodejs version
LABEL maintainer "Jake Wang <jake.wang@sydney.edu.au>"
# Set the working directory
WORKDIR /usr/local/apache2/htdocs
# Enable mod_rewrite
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN { \
  echo 'IncludeOptional conf.d/*.conf'; \
} >> /usr/local/apache2/conf/httpd.conf \
  && mkdir /usr/local/apache2/conf.d

### RELEASE
FROM base AS release
# Allow the logs directory to be mounted
ONBUILD VOLUME ["/usr/local/apache2/htdocs/output"]
# Allow the datastore directory to be mounted
# Expose application port, production port is 7071
EXPOSE 80
