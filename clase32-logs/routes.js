const log4js = require('log4js')

//home
function getRoot(req, res) {
    const logger = log4js.getLogger('info');
    logger.info(`${req.method}: ${req.url} Home`);
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
    const logger = log4js.getLogger('info');
    logger.info(`${req.method}: ${req.url} User:${req.body.username}`);
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
    const logger = log4js.getLogger('error');
    logger.error(`Error: ${req.method}: ${req.url} -- USUARIO Y/O CONTRASEÑA INCORRECTOS`);
    res.send("USUARIO Y/O CONTRASEÑA INCORRECTOS")
}
function signupError(req,res){
    const logger = log4js.getLogger('error');
    logger.error(`Error: ${req.method}: ${req.url} -- USUARIO YA REGISTRADO`);
    res.status("USUARIO YA REGISTRADO")
    
}




//info
function info(req, res) {
    res.json({
    "Argumentos de entrada": process.argv,
    "Nombre de la plataforma": process.platform,
    "Versión de node": process.version,
    "Memoria total reservada": process.memoryUsage(),
    "Path de ejecución": process.execPath,
    "Process ID": process.pid,
    "Carpeta del proyecto": process.cwd()
    })
}

//random


module.exports = {info,getRoot,getLogin,postLogin,getSignup,postSignup,getLogout,loginError,signupError}
