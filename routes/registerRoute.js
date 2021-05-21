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
    check("username", "Please provide a username")
      .not()
      .isEmpty()
      .isAlphanumeric()
      .withMessage("username must contain letters and numbers"),
    check("password", "Please provide a password").not().isEmpty(),
    check("password", "Password should be of 5 char")
      .isLength({
        min: 5,
        max: 20,
      })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/)
      .withMessage(
        "must contain atleast an Uppercase, a number and a special character"
      ),
    //check("dob", "Please provide a Password").isDate(),
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
