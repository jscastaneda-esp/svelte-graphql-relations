FROM node:16.7.0-alpine AS builder
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN pwd
RUN ls -a
RUN npm run build

FROM node:16.7.0-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD [ "npm", "run", "serve" ]