const express = require('express');
const path = require('path');
const mainRoutes = require('./src/routes/main')
const bodyParser = require('body-parser')
const app = express();
const PORT = 3030;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', mainRoutes);

app.listen(PORT, () => { console.log(`Servidor corriendo en ${PORT}...`) });
