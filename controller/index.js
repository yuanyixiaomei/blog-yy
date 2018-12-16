
module.exports={
handleIndexGet(req,res){
    console.log(req.session);
 res.render("index",{user:req.session.user,islogin: req.session.islogion})
}

    
}
