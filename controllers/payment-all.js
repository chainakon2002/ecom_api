const db = require("../models/db");

exports.paymensave = async (req, res, next) =>{
    try{
        const { status, userId, pay, addressId, orderId , slip } = req.body

        const paymets = await db.payment.create({
            data: {
                status,
                userId: parseInt(userId),
                pay,
                addressId: parseInt(addressId),
                orderId: parseInt(orderId),
                slip: slip || null 
            }
        })
        res.json({msg: "PaymentSave This Ok :", paymets})
    }catch(err){
        next(err)
    }
}

exports.paymentshow = async (req, res, next) => {
    try{
        const payments = await db.payment.findMany({
            where: {
                userId: req.user.id
            },include: {
                address: true,
                order: {
                    include: {
                        ordercart: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        })
        res.json(payments)
    }catch(err){

    }
}

