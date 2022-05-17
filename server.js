const app = require("./app.js");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  app.emit("Started");
  console.log(`Server is running on Port ${PORT}`);
});
