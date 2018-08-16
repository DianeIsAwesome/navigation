# FROM node:7.6
# RUN mkdir -p /app
# WORKDIR /app
# COPY package.json /app/
# RUN npm install --only=production
# COPY . /app
# EXPOSE 2999
# ENV DB database
# ENV PORT 2999
# CMD ["npm", "start"]