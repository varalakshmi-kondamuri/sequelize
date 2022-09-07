const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require("../utils/database");

const order = sequelize.define({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports = order;