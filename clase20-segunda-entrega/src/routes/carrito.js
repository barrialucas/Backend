const { Router } = require("express");
const router = Router();

const FactoryDao = require('../index');
const DAO = FactoryDao();


//get all
router.get("/", async (req, res) => {
  try {
    const data = await DAO.cart.getAll();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
})
//save
router.post('/',async (req, res) => {
  try {
    const cart = await {...req.body, ...{ producto: []},...{timestamp: new Date ().toLocaleString()}}
    res.send(DAO.cart.save(cart))
  }
  catch(error){
    console.log(error)
  }
})
//getbyID
router.get("/:id/productos", async (req, res) => {
  const id= Number(req.params.id)
  try {
    const data = await DAO.cart.getByID(id);
    res.send(data)
  } catch (error) {
    console.log(error);
  }
});

//delete
router.delete('/:id/productos',  (req, res) => {
  const id= Number(req.params.id)
  res.send(DAO.cart.deleteByID(id))
})

module.exports = router





