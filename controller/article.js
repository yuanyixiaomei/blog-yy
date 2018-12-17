
module.exports={
    showAdd(req,res){
        // if(!req.session.islogin) return res.redirect("/")
        res.render("article/add.ejs",{
            user:req.session.user,
            islogin: req.session.islogion
        })
    },
 
}
