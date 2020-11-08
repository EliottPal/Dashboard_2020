# base image
FROM node:14

# set working directory
WORKDIR /front

# add `/app/node_modules/.bin` to $PATH
ENV PATH sources/front/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json sources/front/package.json
RUN npm install
RUN npm install react-scripts@4.0.0 -g

# start app
CMD ["npm", "start"]