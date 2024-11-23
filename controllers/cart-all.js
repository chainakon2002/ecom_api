const db = require("../models/db");

exports.cartsave = async (req, res, next) => {
    try{
        const { total, price, UserId, productId } = req.body
        const cart = await db.cart.create({
            data: {
                total: parseInt(total),
                price: parseInt(price),
                UserId: parseInt(UserId),
                productId: parseInt(productId)
            }
        })
        res.json({mgs: 'CartSave This Ok : ', cart})
    }catch(err){
        next(err)
    }
}

exports.cartshowid = async (req, res, next) => {
    try{
        const cart = await db.cart.findMany({
            where: {
                UserId: req.user.id
            }, include: {
                product: true
            }
        })
        res.json(cart)
    }catch(err){
        next(err)
    }
}

exports.cartdalete = async (req, res, next) => {
    try{
        const { id } = req.params
        console.log(id, 55555)
        const cart = await db.cart.delete({
            where: {
                id: Number(id)
            }
        })

        res.json({msg: 'Delete This Ok : ', cart})
    }catch(err){
        next(err)
    }
}

exports.cartupdate = async (req, res, next) => {
    try{
        const { id } = req.params
        const { total, price} = req.body
        console.log(total, price)
        const cart = await db.cart.update({
            where: {
                id: Number(id)
            },
            data: {
                total: parseInt(total),
                price: parseInt(price)
            }
        })

        res.json({msg: 'Update This OK: ', cart})
    }catch(err){
        next(err)
    }
}