const db = require("../models/db");
const cloudUpload = require("../middlewares/cloudUpload");

exports.createProduct = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: 'Please provide an image file' });
    }

    const { ItemName, price, description, stock, category } = req.body;
    console.log('Received data:',{ItemName, price, description, stock, category})


    if (!['SOFTWARE', 'HARDWARE'].includes(category)) {
      return res.status(400).json({ msg: 'Invalid category' });
    }

    if (isNaN(price) || isNaN(stock)) {
      return res.status(400).json({ msg: 'Price and stock must be valid numbers' });
    }


    const imagePromises = req.files.map(file => cloudUpload(file.path));
    const imageUrls = await Promise.all(imagePromises);


    const product = await db.product.create({
      data: {
        ItemName,
        price: +price,
        description,
        stock: parseInt(stock, 10),
        file: imageUrls.join(','), // Assuming multiple images are concatenated by commas
        category, // Include category in the product creation
      }
    });

    res.json({ msg: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    next(error);
  }
};


  exports.getproduct = async (req, res, next) => {
    try {
      const product = await db.product.findMany();
      res.json(product);
    } catch (error) {
      next(error);
    }
  };


exports.updatestock = async (req, res, next) => {
  try{
    const { id } = req.params
    const { stock } = req.body
    const products = await db.product.update({
      where: {
        id: Number(id)
      }, data: {
        stock: parseInt(stock)
      }
    })
    res.json({msg: "UpdateStock This Ok : ", products})
  }catch(err){
    next(err)
  }
}




exports.updateProductDetails = async (req, res, next) => {
  try {
    const { productId, ItemName, price, description, stock, file, category } = req.body;

    console.log('Received data:', { productId, ItemName, price, description, stock, file, category });

    const parsedProductId = parseInt(productId, 10);
    const parsedStock = parseInt(stock, 10);
    const parsedPrice = parseInt(price, 10);

    if (isNaN(parsedProductId) || isNaN(parsedStock) || isNaN(parsedPrice)) {
      return res.status(400).json({ error: "Invalid input: productId, stock, and price must be integers" });
    }

    const updatedProduct = await db.product.update({
      where: { id: parsedProductId },
      data: {
        ItemName,
        price: parsedPrice,
        description,
        stock: parsedStock,
        file,
        category, 
      },
    });

    res.json({ msg: "Product details updated successfully", updatedProduct });
  } catch (err) {
    console.error('Error updating product:', err.message); 
    res.status(500).json({ error: "An error occurred while updating the product", details: err.message });
  }
};


exports.getproductuser = async (req, res, next) => {
  try {
    const product = await db.product.findMany();
    res.json(product);
  } catch (error) {
    next(error);
  }
};
