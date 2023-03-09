const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.resolve(__dirname,"../public")));
app.set('views','/src/views');
//ver esta linea  de arriba!!

const port = process.env.PORT || 3000;

//Para correr ejs previamente instalado en las dependencias de json->
app.set('view engine','ejs');
//Configuracion del acceso a la carpeta de recursos estaticos 

app.listen(port, function(){
    console.log("Servidor escuchando en le puerto 3000 http://localhost:" + port);
});  


app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"src/views/home.html"));
})

// app.get("/productCart", function(req,res){
//     res.sendFile(path.join(__dirname, "src/views/productCart.html"));
// });

app.get("/register",function(req,res){
    res.sendFile(path.join(__dirname,"src/views/register.html"));
})

app.get("/login",function(req,res){
    res.sendFile(path.join(__dirname,"src/views/login.html"));
})

app.get("/productDetail",function(req,res){
    res.sendFile(path.join(__dirname,"src/views/productDetail.html"));
})

const productsRouter = require('./src/routes/productsRouter.js') 
app.use('/products',productsRouter);


//mover app.js a src!