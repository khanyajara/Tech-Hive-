const express = require("express");
const router = express.Router();
const {addProduct, updateProduct,deleteProduct,getProducts, createPaidOrder, trackOrder } = require('../controllers/db');

router.post('/addProduct', addProduct)
router.put('/updateProduct/:id', updateProduct)
router.delete('/deleteProduct/:id', deleteProduct)
router.get('/getProducts', getProducts)
router.post('/paidOrder', createPaidOrder)
router.get('/tracker',  trackOrder)








module.exports = router;

