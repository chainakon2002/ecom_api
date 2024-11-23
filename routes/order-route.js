const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const order = require('../controllers/order-all')

router.post('/order', order.orderSave)
router.post('/ordercart', order.orderCartSave)



module.exports = router