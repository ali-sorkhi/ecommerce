const { findOneAndUpdate, find, update } = require("../models/user");
const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email: email },
    { name, picture },
    { new: true }
  ); //findOneAndUpdate(what to find, what to update, to show updated version)

  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({ email, name, picture }).save(); //how to add new record to collection
  }
};
