const conn=require("../db/index")
const moment = require('moment')
module.exports={
    showRegister(req,res){
        res.render("./user/register.ejs",{})
    },
    showLogin(req,res){
        res.render("./user/login.ejs",{})
    },
    Logout(req,res){
      req.session.destroy(function(){
          res.redirect("/")
      })    
    },
    reg(req,res){
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
    },
    login(req,res){
        let userInfo=req.body
        console.log(userInfo);
    const denglu="select count(*) as count from user where username = ? and password = ?"

    conn.query(denglu,[userInfo.username,req.password],(err,result)=>{
        // console.log(result);
      if(err||result.length===0) return res.status(400).send({status:400,msg:"登陆失败请重试"})
  console.log(result);
    //   console.log(req.session);
    req.session.user=userInfo.username
    req.session.islogion=true
     
      res.send({status:200,msg:"登陆成功"})
    })
    },
}
cookie: { maxAge: 60000 }