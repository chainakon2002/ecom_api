const db = require("../models/db");

exports.deleteproduct = async (req, res, next ) => {
    const {productId} = req.params

    try {
        const product = await db.product.delete({
            where: {
                id: Number(productId)
            }
        })
        res.json(product)
    } catch (error) {
        next(error)
        
    }
}

exports.addproduct = async (req, res, next) => {
  
    try {
      const {
        ItemName,	
        price,
        description	,
        restaurantsId,
        file } = req.body;
      
        
      if (!(ItemName && price && description &&restaurantsId&&file)) {
        return next(new Error("Fulfill all inputs"));
      }
      
  
      const rs = await db.ItemName.create({data})
      console.log(rs)
  
      res.json({ msg: 'Register successful' })
    } catch (err) {
      next(err);
    }
  };

  exports.getorders = async (req, res, next) => {
    try {
      const order = await db.payment.findMany();
      res.json(order);
    } catch (error) {
      next(error);
    }
  };

  exports.updateProduct = async (req, res, next) => {
    const {email, phone} = req.body
    try {
        const reserved = await db.user.update({
            where: {
                id: req.user.id
            },
            data: {
                email,
                phone
                
            }
        })
        res.json(reserved)

    } catch (error) {
        next(error)
    }
}

exports.admingetAddress = async (req, res, next) => {
  try {
      const address = await db.address.findMany();
      res.json(address);
  } catch (error) {
      next(error);
  }
};


exports.getUserDetails = async (req, res, next) => {
  try {
    const users = await db.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching user details:', error); 
    next(error);
  }
};

exports.getadminorder = async (req, res, next) => {
  try{
      const payments = await db.payment.findMany({
          include: {
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
    next(err)
  }
}



exports.updateOrderStatus = async (req, res, next) => {
  try {
      const { orderId, status } = req.body;

      const updatedOrder = await db.order.update({
          where: { id: parseInt(orderId) },
          data: { status },
      });

      res.json({ msg: "Order status updated successfully", updatedOrder });
  } catch (err) {
      next(err);
  }
};

exports.updateShippingDetails = async (req, res, next) => {
  try {
    const { orderId, shippingCompany, trackingNumber,status } = req.body;

    const updatedOrder = await db.order.update({
      where: { id: parseInt(orderId) },
      data: {
        shippingCompany,
        trackingNumber,
        status
      },
    });

    res.json({ msg: "Shipping details updated successfully", updatedOrder });
  } catch (err) {
    next(err);
  }
};




exports.getUserme = async (req, res, next) => {
  try {
    const user = await db.user.findFirst({
      where: { id: req.user.id }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
}


exports.editProfile = async (req, res, next) => {
  try {

    const { name, lastname, phone, email } = req.body;


    const updatedUser = await db.user.update({
      where: {
        id: req.user.id, 
      },
      data: {
        name,
        lastname,
        phone,
        email,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};



exports.updateStatusorder = async (req, res, next) => {
  try {
      const { orderId, status } = req.body;

      const updatedOrder = await db.order.update({
          where: { id: parseInt(orderId) },
          data: { status },
      });

      res.json({ msg: "Order status updated successfully", updatedOrder });
  } catch (err) {
      next(err);
  }
};

exports.cancelstore = async (req, res, next) => {
  try {
      const { orderId, status, cancelstore } = req.body;

      // ตรวจสอบว่ามีข้อมูลครบถ้วน
      if (!orderId || !status) {
          return res.status(400).json({ msg: "Missing orderId or status" });
      }

      // อัพเดตข้อมูลคำสั่งซื้อในฐานข้อมูล
      const updatedOrder = await db.order.update({
          where: { id: parseInt(orderId, 10) },
          data: { status, cancelstore },
      });

      // ส่งข้อมูลกลับพร้อมสถานะ HTTP 200
      res.status(200).json({ msg: "Order status updated successfully", updatedOrder });
  } catch (err) {
      // จัดการข้อผิดพลาด
      console.error("Error updating order status:", err);
      next(err);
  }
};
