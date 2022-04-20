import express from "express"
import cors from "cors"
import i18next from "i18next"
import Backend from "i18next-fs-backend"
import middleware from "i18next-http-middleware"


i18next.use(Backend).use(middleware.LanguageDetector)
.init({
  fallbackLng: 'en',
  backend: {
    loadPath: './locales/{{lng}}/translation.json'
  }
})

const app = express()
app.use(middleware.handle(i18next))
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json({
    status: req.t('status'),
    message: req.t('welcome_message'),
  })
})

export default app
