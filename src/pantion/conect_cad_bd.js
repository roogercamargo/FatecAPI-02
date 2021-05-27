const db = require('./cadbd.js');

const users = db.sequelize.define('users', {
    email: {
        type: db.Sequelize.STRING
    },
    name: {
        type: db.Sequelize.STRING
    }, 
    lastname: {
        type: db.Sequelize.STRING
    }, 
    senha:{
        type: db.Sequelize.STRING
    }

})

module.exports = users;