const express = require("express");
const router = express.Router();
const { verifyAdmin, verifyUser } = require("../middleware/auth");
const FeedController = require("../controller/feedback");

router.post("/feedback", verifyUser, FeedController.postFeedback);
router.get("/getfeeds", verifyUser, FeedController.getFeeds);
router.delete("/deletefeeds/:id", verifyUser, FeedController.deleteFeeds);

module.exports = router;
