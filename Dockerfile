FROM node:lts-alpine as nodebuilder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
RUN mkdir -p /usr/share/nginx/html/pickyeatr
COPY --from=nodebuilder /app/dist /usr/share/nginx/html/pickyeatr
COPY --from=nodebuilder /app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=nodebuilder /app/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]