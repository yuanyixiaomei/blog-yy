const conn=require("../db/index")
const express=require("express")
const  router=express.Router()
const ctrl=require("../controller/index")

router.get("/",ctrl.handleIndexGet)

module.exports=router
