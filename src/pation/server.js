const express = require('express');
const app = new express();


app.use(express.static('front-end'))// pega todos os arquivos de css e imagens da pasta front-end


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/front-end/index.html');
    res.sendFile(__dirname + '/front-end/style.css');
});

app.listen(3000);
//script em node para subir um server web com express~

app.get('/select_cards', function (req, res) {

    var pg = require('pg');
    var conString = "postgres://postgres:admin@localhost:5432/integration";

    var client = new pg.Client(conString);
    client.connect();
    const text = "select * from cards where user_primeiro_nome = $1";
    const values = ['Bernardo']
     select(text, values).then(function (response) {
        console.log(response)
        res.send(response)
    })
    // var conteudoHtml=visu;
    // document.getElementById("areaConteudo").innerHTML=conteudoHtml;

    async function select(text, values) {
        try {
            const res = await client.query(text, values)
            console.log(res.rows[0])
            return res
        }
        catch (err) {
            console.log(err.stack)
        }

        // const text = "select * from cards where card->>$1 = $2";
        // const values = ['project', '[Melo, Melo and Santos e Associados] - Organized impactful instruction set']

        // var visu = async function select() {
        //     try {
        //         const res = await client.query(text, values)
        //         console.log(res.rows[0])
        //         document.getElementById("demo").innerHTML = "Paragraph changed!"; 
        //     }
        //     catch (err) {
        //         console.log(err.stack)
        //     }
        // }

    }})

