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

exports.currentUser = async (req, res) => {
  await User.findOne({ email: req.user.email }).exec((err, user) => {
    //find.execute
    if (err) throw new Error();
    res.json(user);
  });
};
