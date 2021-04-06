const admin = require("../firebase/index");

exports.authCheck = (req, res, next/*cuz it's a middleware we should use next */) => {
  
  next();
};
