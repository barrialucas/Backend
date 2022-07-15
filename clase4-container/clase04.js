const fs =require("fs");
const prods=[];
class Contenedor{
    constructor(name){
        this.name=name
    }

    
    async save (prod){
        try{
            prods.push(prod);
            await fs.promises.writeFile(this.name, JSON.stringify(prods, null, `\t`))
        }
        catch(err){
            console.log("Ocurrio un error: "+err)
        }
    }
    async deleteAll(){
        await fs.promises.unlink(this.name, (borr)=>{
            if(borr) console.log("Se borraron los archivos: "+borr)
        })
    }
    async deleteById(id){
        try {
        const contenido = await fs.promises.readFile(this.name, 'utf-8');
        const conten = JSON.parse(contenido);
        const producto = conten.filter((i) => i.id !== id);
        await fs.promises.writeFile(this.name, JSON.stringify(producto));
        console.log("Producto eliminado");
        } catch (error) {
        return('Hubo un error al eliminar el producto')
        }
  } 
 

    async read(){
        try{
            let read=await fs.promises.readFile(this.name, "utf-8")
            if (read) console.log(read)
        }
        catch(err){
            console.log([])
        }
    }
    async getAll(){
        console.log(prods)
        if(prods===[]) return console.log("Sin productos")
        
    }
    async getByID(id) {
        try {
            const getby = await fs.promises.readFile(this.name, 'utf-8');
            const contenido = JSON.parse(getby);
            const contenById = contenido.find((p) => p.id == id);
            return contenById;
        }catch (error) {
            console.log(error); 
        };
    }
}



const mostrarProd = async () => {
    const documento= new Contenedor ("prods.txt")
  
     documento.save({product:"procesador", price:34345,thumbnail:"", id:prods.length+1})
   documento.save({product:"placa de video", price:60800,thumbnail:"", id:prods.length+1})
   documento.save({product:"memoria ram", price:14500,thumbnail:"", id:prods.length+1})
   documento.save({product:"fuente", price:23049,thumbnail:"", id:prods.length+1}) 
  
  // documento.read()
  
   documento.getAll()
  
  //console.log(await documento.getByID(3))
  
  // documento.deleteAll()
  
  //await documento.deleteById(2);
  
  };
  
  mostrarProd();

