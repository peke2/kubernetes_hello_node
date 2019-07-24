FROM node:8.16

ENV TARGET=hello_server.js

WORKDIR /root
RUN npm install mysql
COPY ./${TARGET} ./
ENTRYPOINT [ "sh", "-c", "node ${TARGET}" ]

EXPOSE 3000

