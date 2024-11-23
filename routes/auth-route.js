const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const authController = require('../controllers/auth-controller')
const ProductController = require('../controllers/product-controller')
const Restaurants = require("../controllers/RestaurantsId")
const products = require('../controllers/productdetell')
const adminController = require('../controllers/admin-controller')
const address = require('../controllers/productdetell')
const Cancel = require('../controllers/order-all')



const userpay = require('../controllers/userpayment')
const { route } = require('./todo-route')
const { orders } = require('../models/db')

const update = require('../middlewares/upload')
const { getByUser } = require('../controllers/user-controller')


router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/res', Restaurants.createRestaurants)
router.post('/payment', products.payments);

router.get('/usergetproduct',ProductController.getproductuser)
router.get('/me', authenticate, authController.getme) 
router.get('/getproduct', authenticate, ProductController.getproduct) 
router.post('/product', update.array("image", 1), ProductController.createProduct)
router.get ('/getproduct/:id', products.orderdate)
router.get('/user', authenticate,userpay.userid)
router.get('/getorder',authenticate,adminController.getorders)
router.get('/userorders', authenticate,products.userorder)
router.delete("/delete/:productId", adminController.deleteproduct)
router.get('/useraddress',authenticate,address.useraddress)
router.post('/addUserAddress',authenticate,address.addUserAddress)
router.get('/admingetaddress',authenticate,adminController.admingetAddress)
router.get('/getuserdetails',authenticate,adminController.getUserDetails)
router.get('/getorderadmin',authenticate,adminController.getadminorder)


router.get('/getuserme',authenticate,adminController.getUserme)
router.put('/updateprofile',authenticate,adminController.editProfile)




router.put('/updateaddress/:addressId', authenticate, address.updateUserAddress);
router.put('/updateorder',authenticate,adminController.updateStatusorder)
router.put('/updateorderstatus', authenticate, adminController.updateOrderStatus);
router.put('/updateproduct',authenticate,ProductController.updateProductDetails);
router.put('/updateShipping',authenticate,adminController.updateShippingDetails);
router.put('/cancel',authenticate,Cancel.canceluser);
router.put('./cancelstore',authenticate,adminController.cancelstore);

router.put('/products/:id', ProductController.updatestock);
module.exports = router