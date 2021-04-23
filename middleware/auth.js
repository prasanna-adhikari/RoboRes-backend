const jwt = require("jsonwebtoken");
const User = require("../model/registrationModel");

module.exports.verifyUser = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const data = jwt.verify(token, "anysecretkey");
    User.findOne({ _id: data.userId })
      .then(function (userdata) {
        req.user = userdata;
        next();
      })
      .catch(function (e) {
        res.status(401).json({
          error: "Auth failed",
        });
      });
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: e });
  }
};

module.exports.verifyCustomer = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized!" });
  } else if (req.user.role !== "Customer") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

module.exports.verifyAdmin = async function (req, res, next) {
  try {
    if (req.user.role === "Admin") {
      next();
    } else {
      res.status(401).json({ error: "Access Denied" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cound not authenticte user" });
  }
};

module.exports.verifyBilling = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized!" });
  } else if (req.user.role !== "Billing") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
