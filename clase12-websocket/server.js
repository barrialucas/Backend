const express=require('express');
const http=require('http');
const{Server}=require('socket.io');

const app=express();

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const httpServer=http.createServer(app);
const io=new Server(httpServer);

app.use(express.static(`./public`))


const message=[]
const prod=[]

app.get(`/`, (req,res)=>{
    res.render(`public/index`,{prod})
})

app.post(`/`, (req,res)=>{
    prod.push(req.body)
    res.render(`public/index`,{prod})
})

io.on(`connection`, (socket)=>{
    socket.emit (`message`, message)

    socket.on(`new-msg`, (newMsg)=>{
        message.push(newMsg);
        io.sockets.emit(`message`, message);
    });

})


httpServer.listen(3000, ()=>{
    console.log("SV ON")
})