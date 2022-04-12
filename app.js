import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Phantom Project Powered By Avengers!!",
  })
})

export default app
