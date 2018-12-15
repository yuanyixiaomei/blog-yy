const express=require("express")
const bodyParser=require("body-parser")
const app=express()
const mysql=require("mysql")
const moment = require('moment')
const conn=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"root",
    database:"blog"
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use("/node_modules",express.static("./node_modules"))
app.set("view engine","ejs")    
app.get("/",(req,res)=>{
    res.render("index",{})
})
app.get("/register",(req,res)=>{
    res.render("./user/register.ejs",{})
})

//注册流程逻辑
app.post("/register",(req,res)=>{
   let userInfo=req.body
   console.log(userInfo);
   if(!userInfo.username||!userInfo.password||!userInfo.nickname) return res.status(400).send({status:400,msg:"请输入表单验证信息 "})
   const chacho="select count(*) as count from user where username = ? "
   conn.query(chacho,userInfo.username,(err,result)=>{
    //    console.log(err);
       if(err) return res.status(500).send({status:500,msg:"查重失败!请重试"})
       if(result[0].count!==0) return res.status(400).send({status:400,msg:"用户名已经被注册"})

       userInfo.ctime=moment().format("YYYY-MM-DD HH:mm:ss")
       const registerSql="insert into user set ?"
       conn.query(registerSql,userInfo,(err,result)=>{
          if(err) return res.status(500).send({status:500,msg:"注册失败"})
           res.send({status:200,msg:"注册成功"})
       })
   })

})


//监控请求登陆页面
app.get("/login",(req,res)=>{
    res.render("./user/login.ejs",{})
})
//登陆页面逻辑
app.post("/login",(req,res)=>{
    let userInfo=req.body
    const denglu="select count(*) as count from user where username = ? and password = ?"

    conn.query(denglu,[userInfo.username,req.password],(err,result)=>{
        console.log(result);
      if(err||result.length===0) return res.status(400).send({status:400,msg:"登陆失败请重试"})
      res.send({status:200,msg:"登陆成功"})
    })
})
app.listen(80,()=>{
    console.log("http://127.0.0.1");
}) 