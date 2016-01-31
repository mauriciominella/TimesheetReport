FROM node:4-onbuild

EXPOSE 5000

# Define working directory.
WORKDIR .

ADD package.json package.jon

RUN npm install

# Define default command.
CMD ["node",'app.js']
