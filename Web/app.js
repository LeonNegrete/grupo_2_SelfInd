const express = require('express');
const { dirname } = require('path');
const app = express();

const path = require('path');

const PORT = 3030;


app.listen(PORT, () => { console.log(`Servidor corriendo en ${PORT}...`) });

app.use(express.static(path.join(__dirname, '/public')));

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'))
})
app.get('/detalle', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/detalle.html'))
})

app.get('/design', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/design.html'))
})

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/login.html'))
})

app.get('/register', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/register.html'))
})

app.get('/carrito', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/shop-car.html'))
})