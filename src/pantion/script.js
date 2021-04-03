// coisas do banco
var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/integration";

var client = new pg.Client(conString);
client.connect();
//---------------------------------
// pegando os arquivos json
const trello = require('./trello.json');
const jira = require('./jira.json');
//---------------------------------
// inserindo no banco
trello.forEach(async card => {
    const text = 'INSERT INTO cards VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *'
    const values = [card._id, card.user._id, card.user.avatar, card.user.userName, card.user.userLastName, card.user.userEmail, card.hours, card.startedAt, card.isFinished, card.project, card.cardDescription, card.status]

    try {
        const res = await client.query(text, values)
        console.log(res.rows[0])
    }
    catch (err) {
        console.log(err.stack)
    }
});
jira.forEach(async card => {
    const text = 'INSERT INTO cards VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *'
    const values = [card.id, card.user.id, card.user.avatar, card.user.first_name, card.user.last_name, card.user.email, card.amountHours, card.startedAt, card.finished, card.project, card.cardDescription, card.status]

    // async/await
    try {
        const res = await client.query(text, values)
        console.log(res.rows[0])
    }
    catch (err) {
        console.log(err.stack)
    }
});