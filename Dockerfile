FROM node:latest

RUN git clone https://github.com/xxirfan/zoro /root/zoromd
WORKDIR /root/zoromd/
RUN npm install npm@latest
RUN npm i

EXPOSE 5000

CMD ["npm", "start"]
