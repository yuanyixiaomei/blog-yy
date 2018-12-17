const mysql=require("mysql")
const conn=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"root",
    database:"blog"
    // multipleStatement:true,
})
module.exports=conn