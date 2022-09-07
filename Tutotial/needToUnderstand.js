const User = require("./models/user");

//bulkCreate insert multiple records
User.bulkCreate([
    {
        userName:"1",
        password:"1"
    },
    {
        userName:"2",
        password:"2"
    }
])

//group