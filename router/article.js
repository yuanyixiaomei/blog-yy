const express=require("express")
const  router=express.Router()
const conn=require("../db/index")



const moment = require('moment')


const ctrl=require("../controller/article")

router.get("/article/add",ctrl.showAdd)
router.get("/article/info",ctrl.showInfo)

// 监听客户端
router.post("/article/add",ctrl.addpost)
module.exports=router