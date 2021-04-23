// use the path of your model
const User = require("../model/registrationModel");
const mongoose = require("mongoose");
// use the new name of the database
const url = "mongodb://localhost:27017/test_user";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe("User Schema test anything", () => {
  // the code below is for insert testing
  it("Add User testing anything", () => {
    const user = {
      name: "test",
      phone: "1234567890",
      address: "test",
      dob: "2000-10-10",
      email: "test@email",
      username: "test",
      password: "test",
      role: "Admin",
    };
    return User.create(user).then((pro_ret) => {
      expect(pro_ret.name).toEqual("test");
    });
  });
  // update testing
  it("to test the update", async () => {
    return User.findOneAndUpdate(
      { _id: Object("607ebd4e936f0f08a05ba881") },
      { $set: { name: "tory" } }
    ).then((pp) => {
      expect(pp.name).toEqual("tory");
    });
  });
  // the code below is for delete testing
  it("to test the delete item is working or not", async () => {
    const status = await User.deleteMany();
    expect(status.ok).toBe(1);
  });
});
