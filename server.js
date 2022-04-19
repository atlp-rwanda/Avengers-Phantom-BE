import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
