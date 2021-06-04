const express = require("express");
const router = express.Router();
const BookingController = require("../controller/booking");
const { verifyAdmin, verifyUser } = require("../middleware/auth");

// ------------------------------For items-------------------------------

router.post("/booking", verifyUser, BookingController.postBooking);
router.get("/booking/getall", BookingController.getAllBooking);
router.get(
  "/booking/getsingle",
  verifyUser,
  BookingController.getSingleBooking
);
router.delete("/booking/delete/:id", BookingController.deleteBooking);
router.put("/booking/update/:id", verifyUser, BookingController.updateBooking);
// router.post(
//   "/cart/androidaddtocart",
//   verifyUser,
//   CartController.androidAddtoCart
// );
// router.put(
//   "/cart/removeItem/:productId",
//   verifyUser,
//   CartController.removeCartItems
// );
// router.put(
//   "/cart/minusItem/:productId",
//   verifyUser,
//   CartController.decreaseCartItems
// );

// router.get("/cart/getItems", verifyUser, CartController.getSingleCart);
// router.delete("/cart/emptyCart/:userId", verifyUser, CartController.emptyCart);
// router.post("/cart/dropItem", verifyUser, CartController.dropItem);

module.exports = router;
