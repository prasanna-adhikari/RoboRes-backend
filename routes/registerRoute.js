const express = require("express");
const { check } = require("express-validator");
const profile = require("../middleware/upload");
const router = express.Router();
const {
  postAddUser,
  deleteUser,
  updateUser,
  postSearchUser,
  loginUser,
  getLoginUser,
  getAllUsers,
} = require("../controller/registration");

const { verifyUser, verifyAdmin } = require("../middleware/auth");

router.post(
  "/user/register",
  [
    check("username", "Please provide a username").not().isEmpty(),
    check("password", "Please provide a password").not().isEmpty(),
    // check('email', "Please provide a Password").isEmail(),
    // check('username', "Please provide a username").not().isEmpty(),
  ],
  profile.single("profile"),
  postAddUser
);

// login user (login system)
router.post("/user/login", loginUser);
// get user
router.get("/user/get", verifyUser, getLoginUser);
router.get("/user/getall", verifyUser, verifyAdmin, getAllUsers);
// for delete
router.delete("/user/deleteRegister/:id", deleteUser);

// for update
router.put("/user/updateRegister/:id", profile.single("profile"), updateUser);
// for search
router.post("/user/search", postSearchUser);

module.exports = router;
