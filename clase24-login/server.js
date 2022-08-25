const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const Container= require("./container/prod")

const session = require("express-session");
const MongoStore = require("connect-mongo");

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
//mongo
app.use(
  session({
    store:MongoStore.create({
      mongoUrl:"mongodb+srv://asd123:asd123@coder.ydroh.mongodb.net/?retryWrites=true&w=majority",
    }),
    secret: "secret",
    resave: true,
    saveUninitialized: false
  })
);


//login
app.get("/login", (req,res)=>{
  if(req.session.user) return res.redirect("/")

  res.sendFile(__dirname + "/views/login.html")
})
app.post("/login",(req,res)=>{
  req.session.user=req.body.user

  return res.redirect("/")
})

app.get("/", async (req, res) => {
  if(!req.session.user){
    res.redirect("/login")
  }else{
    const messages = await messagesJson.getAll();
    res.render("index", { messages, user:req.session.user });
  }
});

app.get("/logout",(req,res)=>{ 
  user=req.session.user
  req.session.destroy()
  res.render("logout",{user})
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

httpServer.listen(3000, () => {console.log(`SV ON...`)})



