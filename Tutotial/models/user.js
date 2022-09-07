const {Sequelize,DataTypes} = require("sequelize");
const sequelize = require("../utils/database");
const bcrypt = require('bcrypt')
const zlib = require('zlib');
const { get } = require("http");

const User = new Sequelize.define({
    id:{
        type : DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[6,10]
        },
        get(){
            const value = this.getDataValue('userName');
            return value.toUpperCase();
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(value){
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value,salt);
            this.setDataValue('password',hash);
        }
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:21
    },
    description:{
        type : DataTypes.STRING,
        allowNull:false,
        set(value){
            const compressed = zlib.deflateSync(value).toString('base64');
            this.setDataValue('description',compressed)
        },
        get(){
            const value = this.getDataValue('description');
            const uncompressed = zlib.inflateSync(Buffer.from(value,'base64'))
            return uncompressed;
        }
    }
},
{
    freezeTableName : true, //will not allow to change table name
    timestamps : false //will not create createdAt and updatedAt fields.
});

module.exports = User;