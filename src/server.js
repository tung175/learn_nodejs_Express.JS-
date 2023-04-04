import express  from 'express';
import configsViewEngine from './configs/viewEngine';
import initWebRoute from './route/web'
// import connection from './configs/connectDB'
require('dotenv').config()

const app = express()
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

configsViewEngine(app)
initWebRoute(app)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})