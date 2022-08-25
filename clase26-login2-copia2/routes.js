//home
function getRoot(req, res) {
    res.sendFile(__dirname + '/views/home.html')
}
//login
function getLogin(req, res) {
    if(req.isAuthenticated()) {
        res.render("index",{user:req.body.username })
        res.send('USUARIO LOGEADO')
    } else {
        res.render("login")
    }
}
function postLogin(req, res) {
    res.render("index",{user:req.body.username})
}


//signup
function getSignup(req, res) {
    res.render("signup")
}
function postSignup(req, res) {
    res.render("login")
}

//logout
function getLogout(req, res) {
    user=req.session.user
    req.session.destroy()
    res.render("logout",{user,message: req.flash()},)
}


//error

function loginError(req,res){
    res.send("USUARIO Y/O CONTRASEÑA INCORRECTOS")
}
function signupError(req,res){
    res.status("USUARIO YA REGISTRADO")
}

module.exports = {getRoot,getLogin,postLogin,getSignup,postSignup,getLogout,loginError,signupError}
