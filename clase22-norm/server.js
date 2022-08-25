const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const Container= require("./container/prod")

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

app.set("views", "./views")
app.set("view engine", "ejs")

const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const schema = normalizr.schema;
const util = require('util')

const schemaAuthor = new schema.Entity(
  "author",
  {},
  {
    idAttribute: "mail",
  }
);

const schemaMessages = new schema.Entity(
  "messages",
  {
    author: schemaAuthor,
  },
  {
    idAttribute: "id",
  }
);

const schemaAllMsg = new schema.Entity(
  "allMessages",
  {
    messages: [schemaMessages],
  },
  {
    idAttribute: "id",
  }
);
const messagesJson = new Container("./container/messages.json");

app.get("/", async (req, res) => {
  const messages = await messagesJson.getAll();
  res.render("index", { messages });
});

io.on("connection", async (socket) => {

  const messages = await messagesJson.getAll();
  const normalizedMsg = normalize(messages, schemaAllMsg);
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
    const normalizedMsg = normalize(messagesId, schemaAllMsg);
    io.sockets.emit("messages", normalizedMsg);

    print(normalizedMsg);
  });
});

httpServer.listen(3000, () => {console.log(`SV ON...`)})



