FROM node:18 as buildimage
WORKDIR /usr/src/app
COPY package.json .
RUN  npm install
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx
COPY  --from=buildimage /usr/src/app/dist ./html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]