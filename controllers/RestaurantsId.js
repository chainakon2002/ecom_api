const db = require("../models/db");

exports.createRestaurants = async (req, res, next) => {
    try {
      const { password, location } = req.body;
      
      // Validation
      if (!(password && location)) {
        return next(new Error("Please provide all required fields"));
      }
  
      const restaurants = await db.restaurants.create({
        data: {
          password,
          location
        }
      });
  
      res.json({ msg: 'Product created successfully', restaurants });
    } catch (error) {
      next(error);
    }
  };