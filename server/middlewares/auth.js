const admin = require("../firebase/index");



var server_time = new Date();


exports.authCheck = async (req, res, next /*cuz it's a middleware we should use next */) => {
  try {

    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken,true);
      
    req.user = firebaseUser;
    console.log("***********",req.user);
    next();
  } catch (error) {
    res.status(401).json({
      error: "invalid or expired token", 
    });
    
    
    console.log(server_time);
  }
};
