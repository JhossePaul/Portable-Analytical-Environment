FROM node:slim

# Metadata
label author "mcromanceva@hotmail.com"
LABEL version="0.0.1"
LABEL release-date="2017-04-20"
LABEL is-production="FALSE"

# Environment variables
ENV NODE_ENV=production

# Create and set working directory
RUN mkdir /client/
WORKDIR /client/

# Install node.js dependencies
COPY package.json wait-for-it.sh /client/
RUN npm install

# Copy static files
COPY backend /client/backend/
COPY public /client/public

# Expose production port
EXPOSE 80

# Start production server
CMD npm run server:prod
