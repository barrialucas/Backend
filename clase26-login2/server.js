const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const Container= require("./container/prod")
const mongoose=require("mongoose")
const Users=require("./models/users")

require("dotenv").config();
require("./passport-config")

//settings
const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//views
app.set("views", "./views")
app.set("view engine", "ejs")

//MSG normalizr
const norm=require("./container/norm")
const messagesJson = new Container("./container/messages.json");


/////////////////////////////End Config///////////////////////////////////////////


//directorio principal
app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/views/home.html")
});

//login
app.get("/login", (req,res)=>{
  res.sendFile(__dirname + "/views/login.html")
})
app.post("/login", (req,res)=>{

  const {user,pass}=req.body
  Users.findOne({user},(err,user)=>{
    if(err){
      res.status(500).send("Error de autentificacion de usuario")
    }else if(!user){
      res.status(500).send("Usuario no existentente")
    }else{
      user.correctPassword(pass,(err,result)=>{
        if(err){
          res.status(500).send("Error de autentificacion")
        }else if(result){
          res.render("index",{user:req.body.user })
        }else{
          res.status(500).send("USUARIO Y/O CONTRASEÑA INCORRECTA")
        }
      })
    }
  })
})
//logout
app.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/");
});

//register
app.get("/register", (req,res)=>{
  res.sendFile(__dirname + "/views/register.html")
})
app.post('/register', async(req, res) => {
  try{
    const user=Users(req.body)
      user.save({
        name:req.body.user,
        pass:req.body.pass
      })
    res.redirect("/login")
  }catch{
    res.redirect("/register")
  }
})


//message
io.on("connection", async (socket) => {
  
  const messages = await messagesJson.getAll();
  const normalizedMsg = norm.normalizedMsg(messages);
  socket.emit("messages", normalizedMsg);

  function print(obj) {
    console.log(util.inspect(obj, false, 12, true));
  }
  socket.on("new-message", async (data) => {
    messagesJson.save(data);
    const messages = await messagesJson.getAll();
    const messagesId = {
			id: "normalize",
			allMessages: [messages]
		}
    const normalizedMsg = norm.normalizedMsg(messagesId,messages);
    io.sockets.emit("messages", normalizedMsg);

    print(normalizedMsg);
  });
});

//mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(()=>console.log("Connected to MongoDB Atlas"))
  .catch((error)=>console.error(error))

httpServer.listen(3000, () => {console.log(`SV ON...`)})



