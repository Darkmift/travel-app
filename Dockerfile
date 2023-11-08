############## APP ##############

FROM node:16-alpine

WORKDIR /project

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

############## MYSQL ##############

CMD ["npm", "run", "dev"]

FROM mysql:8.0

COPY schema.sql /var/lib/mysql/
RUN mysql -u root -ppassword < /var/lib/mysql/schema.sql

EXPOSE 3306

CMD ["mysqld", "--default-authentication-plugin=mysql_native_password", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]
