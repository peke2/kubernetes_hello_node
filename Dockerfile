FROM node:8.16

ENV TARGET=hello_server.js
ENV HASH=container_hash.txt

WORKDIR /root
RUN npm install mysql
COPY ./${TARGET} ./
COPY ./${HASH} ./
ENTRYPOINT [ "sh", "-c", "node ${TARGET}" ]

EXPOSE 3000

