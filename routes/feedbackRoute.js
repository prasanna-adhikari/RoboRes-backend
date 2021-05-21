const express = require("express");
const router = express.Router();
const { verifyAdmin, verifyUser } = require("../middleware/auth");
const FeedController = require("../controller/feedback");

router.post("/feedback", FeedController.postFeedback);
router.get("/getfeeds", FeedController.getFeeds);
router.delete("/deletefeeds/:id", FeedController.deleteFeeds);

module.exports = router;
