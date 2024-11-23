const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
      // Destructure the fields to be updated from the request body
      const { name, lastname, phone, email } = req.body;
  
      // Update the user information in the database
      const updatedUser = await db.user.update({
        where: {
          id: req.user.id,  // Use the ID from the authenticated user
        },
        data: {
          name,
          lastname,
          phone,
          email,
        },
      });
  
      // Return the updated user information as a response
      res.json(updatedUser);
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  };
  