const express=require("express")
const bodyParser=require("body-parser")
const app=express()
const fs=require("fs")
const path=require("path")
const session=require("express-session")

app.use(bodyParser.urlencoded({ extended: false }))
app.use("/node_modules",express.static("./node_modules"))
//ddaoru router
app.use(session({
    secret: '这是加密的秘钥',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10*60*1000 }
  
  }))

app.set("view engine","ejs")    

// const router1=require("./router/index")
// const router2=require("./router/user")
// app.use(router1)
// app.use(router2)

fs.readdir(path.join(__dirname,"./router"),(err,filenames)=>{
    // console.log(filenames);
    if(err) return console.log(("读取失败"))
    filenames.forEach(filename => {
        // console.log(path.join(__dirname),"/router/"+filename);
        const filepath=path.join(__dirname,"./router/"+filename)
        app.use(require(filepath))
    })
})
app.listen(80,()=>{
    console.log("http://127.0.0.1");
}) 