Startup instruction:

1. Install postgress\*

2. Create a psql database. Use console command
   "psql --dbname=postgres",
   then "CREATE DATABASE etherscan"

3. Write in the .env file according to .env.example
   (To get users use command "\du" in psql console)

4. npm or yarn install. Commands ("npm i" or "yarn")

5. Start migrations. Use command in root project directory:
   "npm run migration:migrate" or "yarn migration:migrate"

6. Start project. Use commands "npm run start:dev" or "yarn start:dev"

7. Send curl request "curl --location --request GET 'http://localhost:<YOUR_PORT>/api/numerical-address'"

8. Congratulation!

Resources:
API Link: http://localhost:<YOUR_PORT>/api/docs/v/1.0.0/

Postgres\*: https://www.postgresql.org/
Nestjs: https://docs.nestjs.com/
Typeorm: https://typeorm.io/
