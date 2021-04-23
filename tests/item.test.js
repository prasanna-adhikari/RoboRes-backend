// use the path of your model
const Item = require("../model/itemsModel");
const mongoose = require("mongoose");
// use the new name of the database
const url = "mongodb://localhost:27017/test_item";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe("Item Schema test anything", () => {
  // the code below is for insert testing
  it("Add item testing anything", () => {
    const item = {
      itemName: "test",
      itemCategory: "Fast Food",
      itemPrice: "21",
    };
    return Item.create(item).then((pro_ret) => {
      expect(pro_ret.itemName).toEqual("test");
    });
  });
  // update testing
  it("to test the update", async () => {
    return Item.findOneAndUpdate(
      { _id: Object("607ebd4fe26a140378492241") },
      { $set: { itemName: "momo" } }
    ).then((pp) => {
      expect(pp.itemName).toEqual("momo");
    });
  });
  // the code below is for delete testing
  it("to test the delete item is working or not", async () => {
    const status = await Item.deleteMany();
    expect(status.ok).toBe(1);
  });
});
