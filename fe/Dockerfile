FROM node:20

WORKDIR /app

COPY . .

ARG ENV

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "sh", "-c", "if [ \"$ENV\" = \"prod\" ]; then npm start; else npm run dev; fi" ]

RUN echo "Successfully built {$ENV} environment for Super duper 🦸‍♀️"
