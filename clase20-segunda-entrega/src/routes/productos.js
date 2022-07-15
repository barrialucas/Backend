const { Router } = require("express");
const router = Router();

const FactoryDao = require('../index');
const DAO = FactoryDao();


//get all 
router.get("/", async (req, res) => {
  try {
    const data = await DAO.producto.getAll();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
})

//save 
router.post("/", async (req, res) => {
  try {
  const data = await DAO.producto.save(req.body);
  res.send(data)
  } catch (error) {
    console.log(error);
  }
});

//getbyID
router.get("/:id", async (req, res) => {
  const id= Number(req.params.id)
  try {
    const data = await DAO.producto.getByID(id);
    res.send(data)
  } catch (error) {
    console.log(error);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  const id = req.params;
  try {
    const deletedById = await DAO.producto.deleteByID(id);
    res.send(deletedById);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const id= Number(req.params.id)
  try {
    const data = await DAO.producto.editById(req.body, id);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router
