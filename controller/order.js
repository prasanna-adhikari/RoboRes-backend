const Order = require("../model/orderModel");

exports.orderGet = async (req, res) => {
  try {
    const userid = req.params.id;

    const getOrder = await Order.find({ user: userid })
      .populate("user", "name dob")
      .populate(
        "orderItem.product",
        "itemName itemPrice itemCategory itemImage"
      )
      .sort({ createdAt: -1 });
    res.json({ data: getOrder });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "error getting order" });
  }
};
// get Order
exports.getAllOrders = async (req, res) => {
  try {
    const userId = await Order.find({ user: req.user._id });
    const getOrder = await Order.find()
      .populate("user", "name")
      .populate(
        "orderItem.product",
        "itemName itemPrice itemCategory itemImage"
      );
    res.json({ order: getOrder });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "error adding order" });
  }
};
exports.postOrder = async (req, res) => {
  const { orederItem, user } = req.body;

  orderPost = Order({
    user,
    orderItem,
  });
  orderPost
    .save()
    .then(function (result) {
      return res.status(201).json({ success: true, msg: "Order Success!!!" });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
};
