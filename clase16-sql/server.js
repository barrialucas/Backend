const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.set("views", "./views");
app.set("view engine", "ejs");
app.use("/", express.static(__dirname + "/public"));

const myqsl = require('./options/db-sql');
const sqlite = require('./options/db-sqlite');

const Container= require("./container/prod");
const prod = new Container(myqsl, 'products');
const msg = new Container(sqlite, 'messages')

//
app.get("/", async(req, res) => {
  const messages = await msg.getAll();
  res.render("index", {messages});
});

app.get('/productos', async (req, res) => {
  const products = await prod.getAll();
  res.render("prod", {products})
})


io.on("connection", async (socket) => {
  const products = await prod.getAll();
  socket.emit("mostrar", products);
  socket.on("agregar", (data) => {
    prod.save(data);
    io.sockets.emit("mostrar", 'ok');
  });

  
  const messages = await msg.getAll();
  socket.emit("mensajes", messages)
  socket.on("new-message", (data) => {
  msg.save(data)
  io.sockets.emit("mensajes", messages)
  })
});


//conect
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server http on ${PORT}...`);
})



