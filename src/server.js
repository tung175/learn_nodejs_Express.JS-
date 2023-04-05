import express  from 'express';
import configsViewEngine from './configs/viewEngine';
import initWebRoute from './route/web'
import initAPIRouter from './route/api'
import { render } from 'ejs';

// import connection from './configs/connectDB'
require('dotenv').config()
var morgan = require('morgan')


const app = express()
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use((req, res, next) =>{
  //check => return res.send()
  console.log('>>> run into my middleware')
  console.log(req.method)
  next(); 
})
app.use(morgan('combined'))
//setup engine
configsViewEngine(app)

//inti web route
initWebRoute(app)

//inti api router
initAPIRouter(app)

app.use((req, res) =>{
  return res.render('404.ejs')
}) 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})