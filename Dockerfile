FROM node:20

COPY . /app

WORKDIR /app

RUN npm install && npm run build

ENV OPENAI_API_KEY=""
ENV OPENAI_BASE_URL="https://api.openai.com/v1"

EXPOSE 3000

CMD ["npm", "start"]