const app = require("./app.js");

const { sequelize } = require("./models");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  app.emit("Started");
  console.log(`Server is running on Port ${PORT}`);
});
