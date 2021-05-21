const User = require("../model/registrationModel");

const bcryptjs = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// add user
exports.postAddUser = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, phone, dob, address, email, role, username, password } =
      req.body;

    if (req.file == null) {
      // res.status(400).json({ error: "Invalid File" });
      console.log("no image added");
    }

    try {
      let user = await User.findOne({ username });
      if (user) {
        return res
          .status(409)
          .json({ success: false, error: "Username already exits" });
      }

      const hash = await hashpassword(password);
      user = User({
        name,
        phone,
        email,
        dob,
        address,
        username,
        password,
        role,
      });
      user
        .save()
        .then(function (result) {
          return res
            .status(201)
            .json({ success: true, msg: "Registration Success!!!" });
        })
        .catch(function (err) {
          res.status(500).json({ error: err });
        });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        error: "Could not register user",
      });
    }
    // bcryptjs.hash(password, 5, function (err, hash) {

    // });
  } else {
    console.log(errors.array());
    res.status(400).json({ success: false, error: errors.array() });
  }
};
//decrypt the password
const hashpassword = (password) => {
  bcryptjs.hash(password);
};
// get all uesrs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Cannot get users" });
  }
};
//
exports.getLoginUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e);
    return res.status(401).send("user not found");
  }
};
// delete users
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  await User.deleteOne({ _id: id }).then(function () {
    res.send("Deleted");
  });
};
// update user
exports.updateUser = async (req, res) => {
  console.log("hit");
  try {
    const id = req.params.id;
    const { name, phone, dob, address, email, role, username, password } =
      req.body;

    let profile;
    if (req.file) {
      profile = req.file.path;
    } else {
      profile = req.body.profile;
    }

    User.findByIdAndUpdate(id, {
      $set: {
        name,
        phone,
        address,
        email,
        dob,
        role,
        profile,
      },
    }).then(function () {
      res.json({ success: true });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Could not update user" });
  }
};

// search user
exports.postSearchUser = async (req, res) => {
  // console.log(req.body.searchTerm);
  try {
    const searchTerm = req.body.searchTerm;
    var user = await User.find({
      username: RegExp(searchTerm, "i"),
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Cant search" });
  }
};

// login user
exports.loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    username: username,
  })
    .then(function (userData) {
      if (userData === null) {
        return res
          .status(401)
          .json({ msg: "Incorrect username or password!!" });
      }
      // if user exist
      bcryptjs.compare(password, userData.password, function (err, result) {
        if (result === false) {
          return res
            .status(401)
            .json({ msg: "Incorrect username or password!!" });
        }
        // all good
        // res.send("all is well");
        // then generate ticket or token
        const token = jwt.sign({ userId: userData._id }, "anysecretkey");
        console.log(token);
        return res.status(200).json({
          success: true,
          token: token,
          user: userData,
        });
      });
    })
    .catch(function (e) {
      console.log(e);
      res.status(500).json({ msg: e });
    });
};
