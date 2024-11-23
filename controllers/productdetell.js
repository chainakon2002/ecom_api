const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.orderdate = async (req, res, next) => {
  try {
    const {id} = req.params;
    const productData = await prisma.product.findFirst({
      where: {
        id: Number(id)
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



exports.payments = async (req, res, next) => {
  try {
    const { userId, amount, price, productId, username, productname, addressId , status} = req.body;
    const payment = await prisma.Payment.create({
      data: {
        userId: parseInt(userId),
        username,
        productname,
        amount: parseFloat(amount),
        price: parseInt(price),
        productId: parseInt(productId),
        addressId: parseInt(addressId),
        status,
      }
    });

    res.json({ msg: 'Payment created successfully', payment });
  } catch (error) {
    next(error);
  }
}



exports.userorder = async (req, res, next) => {
  try {
    const orders = await prisma.payment.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        product: true
      }
    });
    
    res.json(orders);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




exports.useraddress = async (req, res, next) => {
  try {
    // ดึงข้อมูลที่อยู่ของผู้ใช้จากฐานข้อมูล
    const addresses = await prisma.address.findMany({
      where: {
        userId: req.user.id
      }
    });

    // ส่งข้อมูลที่อยู่กลับไปยังคลายเอนต์
    res.json(addresses);
  } catch (error) {
    console.error("Error fetching address data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addUserAddress = async (req, res, next) => {
  try {
    const { name, lastname, phone, province, district, tambon, housenumber, village, zipcode, other } = req.body;

    console.log('Received data:', req.body); // Verify received data

    // Validate input
    if (!name || !lastname || !phone || !province || !district || !tambon || !housenumber || !village || !zipcode || !other) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    console.log('User ID:', req.user.id); // Verify user ID

 // Convert zipcode to string if necessary
 const zipcodeStr = zipcode.toString();

 // Create new address in the database
 const newAddress = await prisma.address.create({
   data: {
     name,
     lastname,
     phone,
     province,
     district,
     tambon,
     housenumber,
     village,
     zipcode: zipcodeStr, // Ensure zipcode is a string
     other,
     userId: req.user.id,
   }
 });

    console.log('New address created:', newAddress); // Verify the new address data

    res.status(201).json(newAddress);
  } catch (error) {
    console.error("Error adding new address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateUserAddress = async (req, res, next) => {
  try {
      const { name, lastname, phone, province, district, tambon, housenumber, village, zipcode, other } = req.body;
      const { addressId } = req.params;
      
      console.log('Received addressId:', addressId); // ตรวจสอบ addressId
      console.log('Received data:', req.body); // ตรวจสอบข้อมูลที่รับ
      
      // ตรวจสอบความถูกต้องของข้อมูล
      if (!addressId) {
          return res.status(400).json({ error: "Address ID is required" });
      }
      if (!name || !lastname || !phone || !province || !district || !tambon || !housenumber || !village || !zipcode || !other) {
          return res.status(400).json({ error: "All fields are required" });
      }
      if (!req.user || !req.user.id) {
          return res.status(400).json({ error: "User ID is required" });
      }
      
      const addressIdInt = parseInt(addressId, 10);
      if (isNaN(addressIdInt)) {
          return res.status(400).json({ error: "Invalid Address ID" });
      }
      
      const zipcodeStr = zipcode.toString();

      const updatedAddress = await prisma.address.update({
          where: {
              id: addressIdInt,
          },
          data: {
              name,
              lastname,
              phone,
              province,
              district,
              tambon,
              housenumber,
              village,
              zipcode: zipcodeStr,
              other,
              userId: req.user.id,
          },
      });

      console.log('Address updated:', updatedAddress);

      res.status(200).json(updatedAddress);
  } catch (error) {
      console.error("Error updating address:", error);

      if (error.code === 'P2025') {
          return res.status(404).json({ error: "Address not found" });
      }

      res.status(500).json({ error: "Internal server error" });
  }
};











