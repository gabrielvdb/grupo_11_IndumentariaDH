const express = require("express");
const app = express();
const path = require("path");

app.set("views",path.resolve(__dirname,"./views"));
app.use(express.static(path.resolve(__dirname,"../public")));

app.listen(3001, console.log("servidor corriendo"));

app.get("/",function(req,res){
    res.sendFile(path.resolve(__dirname,"./views/home.html"));
})