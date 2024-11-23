const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.userid = async (req, res, next) => {
  try {
    
    const productData = await prisma.user.findFirst({
      where: {
        id: req.user.id
      }
    })
    if (!productData) {
      return res.status(404).json({ message: "ไม่พบสินค้าที่ค้นหา" });
    }
    res.json(productData);
    console.log(productData)
  } catch (error) {
    next(error); 

  }
};