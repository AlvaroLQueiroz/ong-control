FROM node:6
LABEL Version="1.0"
RUN apt-get update && apt-get install -y dos2unix
RUN mkdir /code
WORKDIR /code
EXPOSE 4200 49152
ADD ["package.json", "./"]
RUN npm install -g @angular/cli@1.0.0 &&  npm install
ADD [".", "./"]
RUN dos2unix start.sh && sh start.sh
