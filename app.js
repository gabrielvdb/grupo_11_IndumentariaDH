const express = require("express");
const app = express();

const path = require("path");

const homeRouter = require("./src/routes/homeRouter.js");
const productRouter = require("./src/routes/productRouter.js");
const userRouter = require("./src/routes/userRouter.js");


app.set('views', path.resolve(__dirname,'./src/views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine','ejs');

app.use(express.static(path.resolve(__dirname,"./public")));
app.use("/", homeRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);


const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Servidor escuchando en el puerto 3000 http://localhost:" + port);
});  

//mover app.js a src!