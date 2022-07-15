const express=require("express")

const app=express()

app.set(`views`, `./views`)
app.set(`view engine`, `ejs`)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

let productos=[]

app.get(`/productos`, (req,res)=>{
    res.render(`public/index`,{productos})
})

app.post(`/productos`, (req,res)=>{
    productos.push(req.body)
    res.render(`public/index`,{productos})
})

app.listen(8080)
console.log("sada")