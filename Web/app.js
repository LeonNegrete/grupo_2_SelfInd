//RUTAS
const mainRoutes = require('./src/routes/main')
const userRoutes = require('./src/routes/users')
const APIRoutes = require('./src/routes/api')

//LIBRERIAS Y FRAMEWORKS
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//const pruebasMD = require('./src/middleware/pruebasMD')

//CONFIG EXPRESS
const app = express();
const PORT = 3030;

//CONFIG EJS
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(cookieParser())
app.use(session({
    secret: "SelfInd",
    resave: false, 
    saveUninitialized: true}));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
//MIDDLEWARES CUSTOM
//app.use(pruebasMD);


//CONFIG RUTAS
app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/api', APIRoutes);
app.get('/draw', (req,res)=>{
    res.render(path.join(__dirname, './src/views/products/draw.ejs'))
})

//CONFIG PUERTO
app.listen(PORT, () => { console.log(`Servidor corriendo en ${PORT}...`) });
