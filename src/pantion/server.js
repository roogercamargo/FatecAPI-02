const bodyParser = require('body-parser');
const express = require('express');
const session = require('cookie-session');
const app = new express();
const path = require('path');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
// const users = require("./conect_cad_bd");

// conteudo do login

app.use(session({ secret: '123' })); //segredo da session
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'front-end')); //views é parametro de configuração
app.use(express.static(__dirname + '/front-end'))// pega todos os arquivos de css e imagens da pasta front-end

app.get('/', function (req, res) {
    if (req.session.email) {
        res.render('menu')
    } else {
        res.render('login')
    }
});

app.post('/', (req, res) => {

    var pg = require('pg');
    var conString = (process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/integration");


    var client = new pg.Client(
        {
            connectionString: conString,
        });
        client.connect(function (err){
            if(err)
                console.log(err);
            else
                console.log("Conectado ao banco!");
        });


    // var client = new pg.Client(conString);
    // client.connect();

    const text = "select * from users where email = $1";
    const values = [req.body.email]
    select(text, values).then(function (response) {

        let email = response.rows[0].email;
        let senha = response.rows[0].senha;

        const match = bcrypt.compare(req.body.senha, senha).then((permitido) => {

            if (permitido) {
                req.session.email = email;
                res.render('menu')
            } else {
                res.render('login')
            }

        });
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

app.get('/total', (req, res) => {
    res.render("dashboards");
})

app.get('/logout', (req, res) => {
    // req.session.destroy((err) => {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     res.redirect('/');
    // });
    res.clearCookie("express:sess");
    res.clearCookie("express:sess.sig");
    res.redirect('/');
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
    var conString = (process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/integration");

    var client = new pg.Client(
        {
            connectionString: conString,
        });
        client.connect(function (err){
            if(err)
                console.log(err);
            else
                console.log("Conectado ao banco!");
        });
    
    // var client = new pg.Client(conString);
    // client.connect();
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
    var conString = (process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/integration");

    var client = new pg.Client(
        {
            connectionString: conString,
        });
        client.connect(function (err){
            if(err)
                console.log(err);
            else
                console.log("Conectado ao banco!");
        });

    // var client = new pg.Client(conString);
    // client.connect();
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
    var conString = (process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/integration");

    // var client = new pg.Client(conString);
    // client.connect();

    var client = new pg.Client(
        {
            connectionString: conString,
        });
        client.connect(function (err){
            if(err)
                console.log(err);
            else
                console.log("Conectado ao banco!");
        });

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

app.get('/usuarios/:id', function (req, res) {
    res.sendFile(__dirname + '/front-end/usuarios.html');
});

app.get('/pegar_usuarios/:id', function (req, res) {

    res.set({ 'content-type': 'application/json; charset=utf-8' });
    var id = req.params.id;
    id = id.replace("%20", " ");
    id = id.replace(":id=", "");

    console.log(id);

    var pg = require('pg');
    var conString = (process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/integration");

    // var client = new pg.Client(conString);
    // client.connect();

    var client = new pg.Client(
        {
            connectionString: conString,
        });
        client.connect(function (err){
            if(err)
                console.log(err);
            else
                console.log("Conectado ao banco!");
        });

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

const user = ""
const pass = ""
app.post('/send', (req, res) => {
    console.log(req);
    const transp = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: { user, pass }

    })
    transp.sendMail({
        from: user,
        to: req.body.email,
        subject: req.body.titulo,
        text: "Atividade: " + req.body.atividade +
            "\nResponsável: " + req.body.responsavel +
            "\nAtividade: " + req.body.atividade +
            "\nStatus: " + req.body.status +
            "\nDescrição: " + req.body.descricao + "."
    }).then(info => {
        res.redirect("/comentarios/" + req.body.idProjeto);
    }).catch(error => {
        console.log(error)
    })

})


app.get('/pagecad', (req, res) => {
    res.render('cadastro');
})



app.listen(process.env.PORT || 3000) ;
// app.listen(3000);
//script em node para subir um server web com express~

app.get('/select_cards/:id', function (req, res) {

    res.set({ 'content-type': 'application/json; charset=utf-8' });
    var id = req.params.id;
    id = id.replace("%20", " ");
    id = id.replace(":id=", "");

    var pg = require('pg');
    var conString = (process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/integration");

    // var client = new pg.Client(conString);
    // client.connect();

    var client = new pg.Client(
        {
            connectionString: conString,
        });
        client.connect(function (err){
            if(err)
                console.log(err);
            else
                console.log("Conectado ao banco!");
        });

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

app.get('/cadastro', function (req, res) {
    res.render('cadastro')
})

app.post('/add-user', function (req, res) {

    var pg = require('pg');
    var conString = (process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/integration");

    var client = new pg.Client(
        {
            connectionString: conString,
        });
        client.connect(function (err){
            if(err)
                console.log(err);
            else
                console.log("Conectado ao banco!");
        });

    // var client = new pg.Client(conString);
    // client.connect();
    const text = `CREATE TABLE IF NOT EXISTS users (
        email varchar(100) primary key not null,
        nome varchar(100) not null,
        sobrenome varchar(100) not null,
        senha varchar(200) not null 
     );`;
    newUser = {
        email: req.body.email,
        nome: req.body.name,
        sobrenome: req.body.lastname,
        senha: req.body.password,
        confirmsenha: req.body.passconfirmation
    }
    createTable(text).then(function (response) {
        console.log("Tabela criada com sucesso!");
    })

    async function createTable(text) {
        try {
            const res = await client.query(text)
            return res;
        }
        catch (err) {
            console.log(err.stack)
        }
    }

    if (newUser.senha == newUser.confirmsenha) {
        console.log("As senhas estão iguais. Cadastrando usuário......");

        bcrypt.hash(newUser.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) {
                console.log(errBcrypt);
            }
            else {
                const cmdCriarUsers = 'insert into users (email, nome, sobrenome, senha) values ($1, $2, $3, $4)';
                const dados = [newUser.email, newUser.nome, newUser.sobrenome, hash];

                insertUser(cmdCriarUsers, dados).then(function (response) {
                    res.redirect('/');
                })

                async function insertUser(text, values) {
                    try {
                        const res = await client.query(text, values)
                        console.log("Usuário cadastrado!");
                        return res;
                    }
                    catch (err) {
                        console.log(err.stack)
                    }
                }
            }
        });
    }
    else {
        res.redirect('/pagecad');
    }

})






    // users.create({
    //     email: req.body.email,
    //     name: req.body.name,
    //     lastname: req.body.lastname,
    //     senha: req.body.password,
    //     passconfirmation: req.body.passconfirmation
    // }).then(function(){
    //     res.send("Usuário cadastrado com sucesso!");
    // }).catch(function(erro){
    //     res.send("Erro: Usuário não foi cadastrado com sucesso..." + erro)
    // })
    // res.send("Email: " + req.body.email + "<br>Nome: " + req.body.name + "<br>" + "<br>Sobrenome: " + req.body.lastname + "<br>"+ "<br>Senha: " + req.body.password + "<br>"
    //  + "<br>Confirmação da senha: " + req.body.passconfirmation + "<br>");

// const open = (process.platform == 'darwin'? 'open': 
// process.platform == 'win32'? 'start': 'xdg-open');

// require('child_process').exec(open + ' ' + 'http://localhost:3000/'); 
