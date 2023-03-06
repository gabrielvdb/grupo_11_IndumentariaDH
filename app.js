const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));

const port = process.env.PORT || 3000;

app.get("/productCart", function(req,res){
    res.sendFile(path.join(__dirname, "src/views/productCart.html"));
});

app.listen(port, function(){
    console.log("Servidor escuchando en le puerto 3000 http://localhost:" + port);
});  


app.use(express.static(path.resolve(__dirname,"../public")));


app.get("/home.html",function(req,res){
    res.sendFile(path.join(__dirname,"src/views/home.html"));
})