const express = require('express');
const app = express();

const path = require('path');

const PORT = 3030;


app.listen(PORT,()=>{`Servidor corriendo en ${PORT}...`});

app.use(express.static('public'));