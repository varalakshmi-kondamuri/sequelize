const sequelize = require("./utils/database");
const Customer = require("./models/customer");
const Order = require("./models/orders");
const User = require("./models/user");
const { useInflection } = require("sequelize/types");

sequelize.authenticate()
    .then((res)=>{
        console.log('Connection Successful!!!',res);
    })
    .catch((err)=>{
        console.log('Connection failed!!',err);
    })

Customer.hasMany(Order);

let customerId = null;

User.sync({alter:true}).then(()=>{
    //update table
    const user = User.build({userName:"varalakshmi",password:"PassWord",age:23,"isActive":true}) 
}).then((data)=>{
    console.log("User Updated!!!",data);
    data.userName = "Varalakshmi Kondamuri";
    data.decrement({age:2});
    data.increment({age:2})
    data.reload();


    data.findAll({});
    data.findAll({attributes:['userName','password']});
    data.findAll({attributes:{exclude:['password']}});
    data.findAll({attributes:[['userName','myName'],['password','pwd']]});
    data.findAll({attributes:[[sequelize.fn('SUM',sequelize.col('age')),'totalOld']]});


    data.findAll({attributes:['userName','password'],where: {age:21,userName:"varalakshmi"},limit:2,order:[['age','DESC']]});

    data.toJSON();
    return data.save();
}).then((data)=>{
    console.log("User updated again !!!");
    return data.destroy();
}).then((res)=>{
    console.log("User destroyed Deleted the data !!!")
})

sequelize
    .sync()
        //  .sync({force:true}) //it removes table from db and again recreate the table
        //  .sync({alter:true}) //it update the data 
    .then((result)=>{
        return Customer.create({'name':"varalakshmi","email":"varalakshmi@divii.com"})
    })
    .then(customer=>{
        customerId=customer.id;
        return customer.createOrder({name:'varamOrder'})
    })
    .then(orders=>{
        console.log('Orders: ',orders);
    })
    .catch(err=>{
        console.log('Error: ',err);
    })

    Order.drop();
    sequelize.drop({match: /_test$/});

    // User.findOne({where:{
    //     age:{
    //         [Op.or]:{
    //             [Op.lt]:25,
    //             [Op.eq]:null
    //         }
    //     }
    // }})

    User.findOrCreate({})




