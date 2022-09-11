const express = require('express');
const app = express();

const path = require('path');

const PORT = 3000;

//

app.listen(PORT,(err)=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}
    ${err}`);
})

app.use('/public', express.static(path.resolve(__dirname, 'public')))

app.get('/home',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views/home.html'));
})