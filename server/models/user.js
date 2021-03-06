const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema; //to refere t another collection

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    //wishlist: [{type: ObjectId, ref: "Product"}],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);