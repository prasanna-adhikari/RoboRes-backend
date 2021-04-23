const express = require("express");
const router = express.Router();
const ItemsController = require("../controller/items");
const { verifyAdmin, verifyUser } = require("../middleware/auth");
const upload = require("../middleware/upload");

// ------------------------------For items-------------------------------
router.get("/items", ItemsController.getAllItems);
router.get("/currentItem/:id", ItemsController.getSingleItems);
router.post(
  "/items/insert",
  verifyUser,
  verifyAdmin,
  upload.single("itemImage"),
  ItemsController.postAddItem
);

router.put(
  "/items/update/:id",
  verifyUser,
  verifyAdmin,
  upload.single("itemImage"),
  ItemsController.UpdateItem
);

// upload.single("itemImage"),

router.delete(
  "/items/delete/:id",
  verifyUser,
  verifyAdmin,
  ItemsController.deleteItem
);

router.post("/items/search", ItemsController.postSearchItem);

module.exports = router;
