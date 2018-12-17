const express=require("express")
const  router=express.Router()
const conn=require("../db/index")

const moment = require('moment')


const ctrl=require("../controller/user")

router.get("/register",ctrl.showRegister)
//注册流程逻辑
router.post("/register",ctrl.reg)


//监控请求登陆页面
router.get("/login",ctrl.showLogin)
//登陆页面逻辑
router.post("/login",ctrl.login)


//监控退出
router.get("/logout",ctrl.Logout)


module.exports=router