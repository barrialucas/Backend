const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/productos', require('./src/routes/productos'))
app.use('/carrito' , require('./src/routes/carrito'))

app.listen(3000,()=>{console.log("SV ON")})