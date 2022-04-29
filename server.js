const app = require("./app.js");
const dotenv = require("dotenv");
const { sequelize } = require("./models");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Server is running on Port ${PORT}`);
  console.log("Database Connected!!");
});
