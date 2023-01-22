const express = require('express')
const { getAllProduct, deleteProduct, updateProduct, createProduct, getSingleProduct } = require('../controllers/productController')
const { createReview, getReview, deleteReviwe } = require('../controllers/reviewController')
const { singup, login } = require('../controllers/user')


const router = express.Router()

router.post('/singup', singup)
router.post('/login', login)


router.post('/create', createProduct)
router.get('/getallproduct', getAllProduct)
router.get('/getsingleproduct/:productId', getSingleProduct)
router.put('/updateproduct/:productId', updateProduct)
router.delete('/creatdeleteproducte/:productId', deleteProduct)

router.post('/createReview', createReview)
router.get('/getReview/:id', getReview)
router.delete('/deleteReviwe/:id', deleteReviwe)




module.exports = router