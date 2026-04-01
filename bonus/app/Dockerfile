FROM node:18-alpine
# 실무 팁: tini를 PID 1로 사용하여 신호 전달 문제 해결
RUN apk add --no-cache tini
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]