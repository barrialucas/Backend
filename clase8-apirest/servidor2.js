const express=require("express")
const {Router}=express

const app=express()
let data=[]

app.use(`/public`, express.static(__dirname+`/public`))

app.use(express.json())
app.use(express.urlencoded({extended:true}))


//AGREGAR PRODUCTOS y MOSTRARLOS
const router=Router()
router.get(`/`, (req,res)=>res.json(data))
router.post(`/`, (req,res)=>{
    const prod=req.body

    prod.id=data.length+1
    data.push(prod);

    res.json(data);
})


//DEVOLVER PRODUCTO SEGUN ID
router.get(`/:id`, (req,res)=>{
    const id= Number(req.params.id)

    const prod=data.find(p=>p.id===id)
    if(prod==undefined){
        res.send(`Producto no encontrado`)
    }
    else {res.json(prod)}
})

//ELIMINAR PRODUCTO SEGUN ID

router.delete(`/:id`,(req,res)=>{
    const id= Number(req.params.id)

    const prod=data.findIndex(p=>p.id==id)
    if(prod===-1){
        res.send(`El producto que quiere elminar no existe`)
    }
    else{
        data.splice(prod,1)
        res.send(`Producto eliminado exitosamente | id:${id}`)
    }
})


app.use(`/api/productos`, router)

app.listen(8080)