
const {auth} = require("./auth")

//permission to access to the admin routes
//the admin should be loggedin at first place and second should have the isadmin property

  // For Admin
const isadmin = (req, res, next) => {
    
      if (req.user.isAdmin === true) {
        next();
      } else {
        res.status(403).send("Access denied. Not authorized...");
      }
   
  };
  module.exports = { isadmin };
  