//import all library

const express=require("express")
const app=express();
const bodyparser=require("body-parser")
const router=require("./router/routers.js")

//add all middlewares

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

//add url handlers
app.use("/" , router);

//start the server

app.listen(3002,function(){
    console.log("server running at port :3002")
})
module.exports=app;