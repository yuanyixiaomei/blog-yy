const express=require("express")
const  router=express.Router()
const conn=require("../db/index")



const moment = require('moment')


const ctrl=require("../controller/article")

router.get("/article/add",ctrl.showAdd)


module.exports=router