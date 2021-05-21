const express = require("express");
const router = express.Router();
const FeedController = require("../controller/feedback");

router.post("/feedback", FeedController.postFeedback);
router.get("/getfeeds", FeedController.getFeeds);

module.exports = router;
