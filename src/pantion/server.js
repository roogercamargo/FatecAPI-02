const express = require('express');
const app = new express();


app.use(express.static('front-end'))// pega todos os arquivos de css e imagens da pasta front-end


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/front-end/index.html');
});

app.get ('/projeto/:id', function(req, res){
    res.sendFile(__dirname +'/front-end/projeto.html');
});

app.get('/grafico', function (req, res) {

    var pg = require('pg');
    var conString = "postgres://postgres:admin@localhost:5432/integration";

    var client = new pg.Client(conString);
    client.connect();
    const text = "select * from cards where projeto = $1";
    const values = ['[Melo, Melo and Santos e Associados] - Organized impactful instruction set']
    select(text, values).then(function (response) {
        console.log(response)
        res.send(response)
    })


    async function select(text, values) {
        try {
            const res = await client.query(text, values)
            console.log(res.rows[0])
            return res
        }
        catch (err) {
            console.log(err.stack)
        }
    }

});

app.get('/select_projects', function (req, res) {

    var pg = require('pg');
    var conString = "postgres://postgres:admin@localhost:5432/integration";

    var client = new pg.Client(conString);
    client.connect();
    const text = "select distinct projeto from cards;";
    select(text).then(function (response) {
        res.send(response);
    })


    async function select(text) {
        try {
            const res = await client.query(text)
            console.log(res.rows[0]);
            return res;
        }
        catch (err) {
            console.log(err.stack);
        }
    }

});




app.listen(3000);
//script em node para subir um server web com express~

app.get('/select_cards/:id', function (req, res) {

    const id = req.params.id;

    var pg = require('pg');
    var conString = "postgres://postgres:admin@localhost:5432/integration";

    var client = new pg.Client(conString);
    client.connect();
    const text = "select * from cards where projeto = $1";
    const values = ['"'+ id +'"']
    select(text, values).then(function (response) {
        res.send(response)
    })

    async function select(text, values) {
        try {
            const res = await client.query(text, values)
            console.log(res.rows[0])
            return res
        }
        catch (err) {
            console.log(err.stack)
        }
    }
})

