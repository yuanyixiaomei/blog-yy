const moment=require("moment")
const conn=require("../db/index.js")
module.exports={
    showAdd(req,res){
        // if(!req.session.islogin) return res.redirect("/")
        res.render("article/add.ejs",{
            user:req.session.user,
            islogin: req.session.islogion
        })
    },
    showInfo(req,res){
        res.render("article/info.ejs")
    },
    addpost(req,res){
    
       let body=req.body
      
       body.authorId=req.session.user.id
       body.ctime=moment().format("YYYY-MM-DD HH:mm:ss")
       
       const sql="insert into article set ?"
        // const sql="select * from article"
        console.log(body)
       conn.query(sql,body,(err,result)=>{
        
           if(err) return res.send({msg:"发表文章失败",status:500})
           console.log(result);
           if(result.affectedRows!=1) return res.send({msg:"发表文章失败",status:501})
           res.send({msg:"发表文章成功",status:200,insertId:result.insertId})
       })
       
       
    }
 
}
