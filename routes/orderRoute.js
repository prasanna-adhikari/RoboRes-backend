const express = require("express");
const router = express.Router();
const OrderController = require("../controller/order");
const { verifyAdmin, verifyUser } = require("../middleware/auth");

// ------------------------------For items-------------------------------

router.post("/order/addorder", verifyUser, OrderController.postOrder);

router.get("/order/getorder/:id", verifyUser, OrderController.orderGet);
router.get("/orders", verifyUser, OrderController.getAllOrders);

module.exports = router;
