FROM node:4-onbuild

EXPOSE 5000

# Define working directory.
WORKDIR .

VOLUME .:/usr/src/app

ADD package.json package.jon

RUN npm install -g gulp
RUN npm install -g mocha chai

RUN npm install

# Define default command.
CMD ["node",'app.js']
