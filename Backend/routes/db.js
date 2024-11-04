const express = require("express");
const router = express.Router();
const {addProduct, updateProduct,deleteProduct,getProducts } = require('../controllers/db');

router.post('/addProduct', addProduct)
router.put('/updateProduct/:id', updateProduct)
router.delete('/deleteProduct/:id', deleteProduct)
router.get('/getProducts', getProducts)







module.exports = router;

