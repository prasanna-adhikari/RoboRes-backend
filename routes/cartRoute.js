const express = require("express");
const router = express.Router();
const CartController = require("../controller/cart");
const { verifyAdmin, verifyUser } = require("../middleware/auth");

// ------------------------------For items-------------------------------

router.post("/cart/addtocart", verifyUser, CartController.addItemToCart);
router.post(
  "/cart/androidaddtocart",
  verifyUser,
  CartController.androidAddtoCart
);
router.put(
  "/cart/removeItem/:productId",
  verifyUser,
  CartController.removeCartItems
);
router.put(
  "/cart/minusItem/:productId",
  verifyUser,
  CartController.decreaseCartItems
);

router.get("/cart/getItems", verifyUser, CartController.getSingleCart);
router.delete("/cart/emptyCart/:userId", verifyUser, CartController.emptyCart);
// router.post("/cart/dropItem", verifyUser, CartController.dropItem);

module.exports = router;
