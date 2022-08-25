const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const Container= require("./container/prod")
require("dotenv").config()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose=require("mongoose")
const LocalStrategy= require("passport-local").Strategy
const bcryptjs=require("bcryptjs")

const routes = require('./routes')

//user model
const Users=require("./models/users")
//settings
const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 50000*10,
    secure: false,
    httpOnly: true
  }
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//views
app.set("views", "./views")
app.set("view engine", "ejs")

//MSG normalizr
const norm=require("./container/norm")
const messagesJson = new Container("./container/messages.json");


/////////////////////////////End Config///////////////////////////////////////////

//directorio principal

passport.use('login', new LocalStrategy(
  async ( username, password, done ) => {
    const user = await Users.findOne({ username });
    if( !user ) {
      return done( null, false);
    }
    const validPass = bcryptjs.compareSync( password, user.password );
    if( !validPass ){
      return done( null, false);
    }

    return done( null, user );
  }
) )


passport.use('signup', new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, done) => {
      Users.findOne({username}, (err, user) => {
          if(err) return done(err)
          if (user) {
            return done(null, false)
          }
          const newUser = { username, password,date: Date.now().toString() }
          const userss=Users(req.body)
          userss.save(newUser, (err, userWithID) => {
              if(err) return done(err)
              return done(null, userWithID)
          })

      })

  }
))
passport.serializeUser((user, done) => {
  done(null, user._id)
})
passport.deserializeUser((id, done) => {
  Users.findById(id, done)
})


//ROUTES

//info
app.get('/info', routes.info)
//randoms
app.use( '/api/randoms', routes.random )
//home
app.get('/', routes.getRoot)
//login
app.get('/login', routes.getLogin)
app.post('/login',
passport.authenticate('login',{failureRedirect: '/loginError'}),
routes.postLogin
)
//register
app.get('/signup', routes.getSignup)
app.post('/signup',
passport.authenticate('signup', {failureRedirect: '/signupError'}),
routes.postSignup
)
//error
app.get('/loginError', routes.loginError)
app.get('/signupError', routes.signupError)

//logout
app.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


//logout
app.post('/logout',(req, res)=>{
  const { username } = request.session 
  req.session.destroy(()=>{ 
    res.render('logout')
  })

})
function checkAuthentication(req, res, next) {
    if(req.isAuthenticated()) next()
    else res.redirect("/login")
}
app.get("/index", checkAuthentication, (req, res) => {
  const { user } = req
    res.render("index")
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

mongoose
  .connect(process.env.MONGODB_URI)
  .then(()=>console.log("Connected to MongoDB Atlas"))
  .catch((error)=>console.error(error))


//yargs
  const yargs = require('yargs')(process.argv.slice(2));

  const argv = yargs
    .default({
      port: 3000
    })
    .alias({
      p: 'port'
    })
    .argv;

httpServer.listen(argv.port, () => {console.log(`SV ON...`)})



