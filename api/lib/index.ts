import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get('/', (_, res) => {
  res.send('Hello, world!')
})

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}.`)
})
