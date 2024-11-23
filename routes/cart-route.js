const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const cart = require('../controllers/cart-all')

router.post('/carts', cart.cartsave)

router.get('/carts', authenticate, cart.cartshowid)

router.delete('/carts/:id', authenticate, cart.cartdalete)

router.put('/carts/:id',  cart.cartupdate)

module.exports = router