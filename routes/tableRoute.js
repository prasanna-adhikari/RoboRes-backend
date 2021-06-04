const express = require("express");
const router = express.Router();

const {
  addTable,
  getAllTable,
  deleteTable,
  updateTable,
  occupiedTable,
  freeTable,
} = require("../controller/table");

router.post("/table/add", addTable);
router.get("/table/getall", getAllTable);
router.put("/table/update/:id", updateTable);
router.delete("/table/delete/:id", deleteTable);

router.put("/table/status-pack", occupiedTable);
router.put("/table/status-free/:id", freeTable);
// router.post("/table/status", occupiedTable);

module.exports = router;
