
const app = require("./app.js");
const dotenv = require('dotenv');

const { sequelize } = require("./models");

dotenv.config({path:'./config.env'})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  app.emit("Started");
  console.log(`Server is running on Port ${PORT}`);
});
