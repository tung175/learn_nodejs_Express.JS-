import  express  from "express";

const configsViewEngine = (app) =>{
    app.use(express.static('./src/public'))
    app.set("view engine", "ejs")
    app.set("views", "./src/views")
}

export default configsViewEngine;