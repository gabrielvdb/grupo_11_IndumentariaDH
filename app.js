const express = require("express");
const session = require("express-session");
const app = express();
const methodOverride = require('method-override');
const cookies = require('cookie-parser');

const path = require("path");

const homeRouter = require("./src/routes/homeRouter.js");
const productRouter = require("./src/routes/productRouter.js");
const userRouter = require("./src/routes/userRouter.js");

const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');


app.use(session({
    secret: "Es un secreto, si tu mirada y la mia♫",
    resave: false,
    saveUninitialized: false,
}));

app.use(cookies());

app.use(userLoggedMiddleware);
app.set('views', path.resolve(__dirname,'./src/views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine','ejs');
app.use(methodOverride('_method'));

app.use(express.static(path.resolve(__dirname,"./public")));
app.use("/", homeRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);


const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Servidor escuchando en el puerto 3000 http://localhost:" + port);
});  

//mover app.js a src!