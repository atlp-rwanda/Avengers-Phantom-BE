const app = require("./app.js");
const dotenv = require('dotenv');
const socket = require('./src/utils/socket')
const { sequelize } = require("./models");

dotenv.config({path:'./.env'})

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  app.emit("Started");
  console.log(`Server is running on Port ${PORT}`);
});
socket.socketMethod.socketStarter(server)

