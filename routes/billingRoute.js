const express = require("express");
const router = express.Router();
const BillController = require("../controller/bill");
const { verifyAdmin, verifyUser } = require("../middleware/auth");

// ------------------------------For items-------------------------------

router.post("/bill/postbill", verifyUser, BillController.postBilling);

// router.get("/order/getorder/:id", verifyUser, BillController.orderGet);
// router.get("/orders", verifyUser, BillController.getAllOrders);
// router.delete("/orders/delete/:id", verifyUser, BillController.deleteOrder);

module.exports = router;
