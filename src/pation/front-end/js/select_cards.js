var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/integration";

var client = new pg.Client(conString);
client.connect();

const text = "select * from cards";
const values = []
var visu = select(text, values).then(function(res){
    console.log(res)
    return res
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
}

