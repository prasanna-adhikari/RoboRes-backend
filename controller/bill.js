const Bill = require("../model/billModel");
const Order = require("../model/orderModel");

exports.postBilling = async (req, res) => {
  const { orderItem, user, grandTotal, orderId } = req.body;

  bill = Bill({
    user,
    orderItem,
    grandTotal,
  });
  await bill
    .save()
    .then(async function (result) {
      const order = await Order.findOne({ _id: orderId });
      order.status = "Paid";
      order.save();
      console.log(order);
      return res
        .status(201)
        .json({ success: true, msg: "Billing add Success!!!" });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
};
exports.getAllBills = async (req, res) => {
  try {
    const getBill = await Bill.find()
      .populate("user", "name")
      .populate(
        "orderItem.product",
        "itemName itemPrice itemCategory itemImage"
      );
    res.json({ bill: getBill });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "error adding order" });
  }
};
exports.deleteBill = async (req, res) => {
  try {
    const billId = req.params.id;
    await Order.deleteOne({ _id: billId });

    return res
      .status(200)
      .json({ success: true, msg: "bill deleted successfuly" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "error deleting  order" });
  }
};
