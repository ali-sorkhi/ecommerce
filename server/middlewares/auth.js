const admin = require("../firebase/index");
const { addListener, getMaxListeners } = require("../models/user");



var server_time = new Date();


exports.authCheck = async (req, res, next /*cuz it's a middleware we should use next */) => {
  try {

    /* const firebaseUser = await admin
      .auth()
      .getUser(req.headers.authtoken,true); */
      
    req.user = { name: req.headers.email.split("@")[0] , email: req.headers.email , picture : "" }
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({
      error: "invalid or expired token", 
    });
    
    
    console.log(server_time);
  }
};
