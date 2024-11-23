require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/error')
const authRoute = require('./routes/auth-route')
const todoRoute = require('./routes/todo-route')
const cart = require('./routes/cart-route')
const order = require('./routes/order-route')
const payment = require('./routes/payment-route')

const app = express()

app.use(cors())
app.use(express.json())

// service
app.use('/auth', authRoute)
app.use('/todos', todoRoute)

//Cart
app.use('/cart', cart)

//Order
app.use('/order', order)

//Payment
app.use('/payment', payment)

// notFound
app.use( notFound )

// error
app.use(errorMiddleware)

let port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on Port :', port))