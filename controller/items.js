const Items = require("../model/itemsModel");

// Add items
exports.postAddItem = async (req, res) => {
  try {
    const { itemName, itemCategory, itemPrice } = req.body;

    // if (req.file == null) {
    //   return res.status(400).json({ error: "Invalid File" });
    // }
    const itemImage = req.file.path;
    const items = new Items({
      itemName,
      itemCategory,
      itemPrice,
      itemImage,
    });
    await items.save();
    return res.status(200).json({ msg: "Added Item" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "error adding item" });
  }
};
// get items
exports.getAllItems = async (req, res) => {
  try {
    const itemName = req.body.itemName;
    const items = await Items.find().sort({ itemName: 1 });
    res.status(200).json({ success: true, items });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Cant get" });
  }
};
exports.getSingleItems = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Items.findOne({ _id: itemId });
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Cant get item" });
  }
};
// update all items
exports.UpdateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const { itemName, itemCategory, itemPrice } = req.body;

    let itemImage;
    if (req.file) {
      itemImage = req.file.path;
    } else {
      itemImage = req.body.itemImage;
    }
    Items.findByIdAndUpdate(id, {
      $set: {
        itemName,
        itemCategory,
        itemPrice,
        itemImage,
      },
    }).then(function () {
      return res.send({ success: true, message: "Updated succesfully" });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Could not update item" });
  }
};
//  delete  item
exports.deleteItem = async (req, res) => {
  const itemId = req.params.id;
  Items.deleteOne({ _id: itemId }).then(function () {
    res.send("Deleted");
  });
};
// search item
exports.postSearchItem = async (req, res) => {
  // console.log(req.body.searchTerm);
  try {
    const searchTerm = req.body.searchTerm;
    var item = await Items.find({
      itemName: RegExp(searchTerm, "i"),
    });
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Cant search" });
  }
};
