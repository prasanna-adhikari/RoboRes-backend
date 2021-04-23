const Bill = require("../model/billModel");
const Items = require("../model/itemsModel");
const Registration = require("../model/registrationModel");

exports.getBilling = async (req, res) => {
  const { username, role } = req.user;
  try {
    const username = req.params.username;
    const user = await Registration.findById(userId);
    const data = await bill.cart.populate("items.product").execPopulate();
    let bill;
    if (role == "Admin" || role == "Billing") {
      bill = await Bill.find();
    } else {
      bill = await Bill.find({ user: username });
    }
    res.render("device-billing", { data: data.items, username, access });
  } catch (error) {
    console.log(error);
  }
};
