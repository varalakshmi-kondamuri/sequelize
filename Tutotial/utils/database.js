const Sequelize = require('sequelize');
const sequelize = new Sequelize("my_schema","root","varalakshmimysql",{
    dialect:"mysql",
    host:"localhost",
    define:{ //instead of writing for each table we can write them here
        freezeTableName : true
        
    }
});

module.exports = sequelize;