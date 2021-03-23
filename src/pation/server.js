const express = require('express');
const app = new express();


app.use(express.static('front-end'))// pega todos os arquivos de css e imagens da pasta front-end


app.get('/', function(req, res){
    res.sendFile(__dirname + '/front-end/index.html');
    res.sendFile(__dirname + '/front-end/style.css');
});

app.listen(3000);
 //script em node para subir um server web com express