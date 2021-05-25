const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session')
const app = new express();
const path = require('path');

// conteudo do login

var email = "admin";
var senha = "admin";

app.use(session({ secret: '123' })); //segredo da session
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'front-end')); //views é parametro de configuração
app.use(express.static('front-end'))// pega todos os arquivos de css e imagens da pasta front-end

app.get('/', function (req, res) {
    if (req.session.email) {
        res.render('menu')
    }else{
        res.render('login')
    }
});

app.post('/', (req, res) => {
    if (req.body.email == email && req.body.senha == senha) {
        req.session.email = email;
        res.render('menu')
    }else{
        res.render('login')
    }
})

app.get('/total', (req, res) => {
    res.render("dashboards");
})

app.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
})

app.get('/projeto/:id', function (req, res) {
    res.sendFile(__dirname + '/front-end/kanban.html');
});
app.get('/grafico/:id', function (req, res) {
    res.sendFile(__dirname + '/front-end/graficoteste.html');
});

app.get('/comentarios/:id', function (req, res) {
    res.sendFile(__dirname + '/front-end/comentarios.html');
});

app.get('/grafico', function (req, res) {

    var pg = require('pg');
    var conString = "postgres://postgres:admin@localhost:5432/integration";

    var client = new pg.Client(conString);
    client.connect();
    const text = "select * from cards";
    const values = []
    select(text, values).then(function (response) {
        res.send(response)
    })


    async function select(text, values) {
        try {
            const res = await client.query(text, values)
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
            return res;
        }
        catch (err) {
            console.log(err.stack);
        }
    }

});

app.get('/select_chart/:id', function (req, res) {

    res.set({ 'content-type': 'application/json; charset=utf-8' });
    var id = req.params.id;
    id = id.replace("%20", " ");
    id = id.replace(":id=", "");

    var pg = require('pg');
    var conString = "postgres://postgres:admin@localhost:5432/integration";

    var client = new pg.Client(conString);
    client.connect();
    const text = "select * from cards where projeto = $1";
    const values = [id]
    select(text, values).then(function (response) {
        res.send(response)
    })

    async function select(text, values) {
        try {
            const res = await client.query(text, values)
            return res;
        }
        catch (err) {
            console.log(err.stack)
        }
    }

});

app.get('/usuarios/:id', function(req, res) {
    res.sendFile(__dirname + '/front-end/usuarios.html');
});

app.get('/pegar_usuarios/:id', function(req, res){

    res.set({ 'content-type': 'application/json; charset=utf-8' });
    var id = req.params.id;
    id = id.replace("%20", " ");
    id = id.replace(":id=", "");

    console.log(id);

    var pg = require('pg');
    var conString = "postgres://postgres:admin@localhost:5432/integration";

    var client = new pg.Client(conString);
    client.connect();
    const text = "select distinct user_email, user_primeiro_nome, user_ultimo_nome, user_avatar, projeto from cards where projeto = $1;";
    const values = [id];
    select(text, values).then(function (response) {
        console.log(response);
        res.send(response);
    })


    async function select(text) {
        try {
            const res = await client.query(text, values)
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

    res.set({ 'content-type': 'application/json; charset=utf-8' });
    var id = req.params.id;
    id = id.replace("%20", " ");
    id = id.replace(":id=", "");

    var pg = require('pg');
    var conString = "postgres://postgres:admin@localhost:5432/integration";

    var client = new pg.Client(conString);
    client.connect();
    const text = "select * from cards where projeto = $1";
    const values = [id]
    select(text, values).then(function (response) {
        res.send(response)
    })

    async function select(text, values) {
        try {
            const res = await client.query(text, values)
            return res;
        }
        catch (err) {
            console.log(err.stack)
        }
    }
})

// const open = (process.platform == 'darwin'? 'open': 
// process.platform == 'win32'? 'start': 'xdg-open');

// require('child_process').exec(open + ' ' + 'http://localhost:3000/'); 
