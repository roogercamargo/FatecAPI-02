const Sequelize = require("sequelize");
const sequelize = new Sequelize ('integration', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
