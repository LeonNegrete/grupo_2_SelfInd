const express = require('express');
const path = require('path');
const mainRoutes = require('./src/routes/main')
const userRoutes = require('./src/routes/users')
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const app = express();
const PORT = 3030;

app.set("view engine", "ejs");

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.get('/draw', (req,res)=>{
    res.render(path.join(__dirname, './src/views/products/draw.ejs'))
})
app.listen(PORT, () => { console.log(`Servidor corriendo en ${PORT}...`) });
