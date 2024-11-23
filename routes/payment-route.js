const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const payment = require('../controllers/payment-all')

router.post('/payments', payment.paymensave)

router.get('/paymentuser', authenticate, payment.paymentshow)

module.exports = router