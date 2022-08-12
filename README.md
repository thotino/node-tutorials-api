# NODE TUTORIALS API
This project is a simple API that can create, retrieve, update and delete tutorials.
This project is inspired from [the BezKoder tutorial](https://www.bezkoder.com/node-js-express-sequelize-mysql/)

## Features
* ExpressJS server
* SQLite3 database with Sequelize ORM
* JWT authentication
* CRUD services for the tutorials
* Dockerization

## Install and start locally
```sh
git clone https://github.com/thotino/node-tutorials-api.git
cd node-tutorials-api
npm install
npm start
```

## Install and start with Docker
```sh
git clone https://github.com/thotino/node-tutorials-api.git
cd node-tutorials-api
docker build . -t tutorials-server
docker run tutorials-server -p 3000:3000
```