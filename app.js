require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

//levantar el sevidor

server.listen();
