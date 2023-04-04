import express  from 'express';
import configsViewEngine from './configs/viewEngine';
import initWebRoute from './route/web'
import initAPIRouter from './route/api'

// import connection from './configs/connectDB'
require('dotenv').config()

const app = express()
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//setup engine
configsViewEngine(app)

//inti web route
initWebRoute(app)

//inti api router
initAPIRouter(app)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})