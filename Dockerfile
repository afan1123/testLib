FROM registry.venuseye/library/node:11-alpine

WORKDIR /home/app

ADD . ./

CMD ["sh", "-c", "node app.js"]