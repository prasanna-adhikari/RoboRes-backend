const { response } = require("express");
const Feedback = require("../model/feedbackModel");

exports.postFeedback = async (req, res) => {
  try {
    const { name, sub, desc } = req.body;
    feedback = Feedback({
      name,
      sub,
      desc,
    });
    await feedback.save();
    return res.status(200).json({ success: true, msg: "feedback added" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err: "Cannot add feedback" });
  }
};

exports.getFeeds = async (req, res) => {
  try {
    const feeds = await Feedback.find();
    res.status(200).json({ success: true, msg: "feed get successfuly", feeds });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err: "Cant get feeds" });
  }
};

exports.deleteFeeds = async (req, res) => {
  const feedID = req.params.id;
  Feedback.deleteOne({ _id: feedID })
    .then((response) => {
      return res
        .status(200)
        .json({ success: true, msg: "feed deleted successfuly" });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, err: "Cant get feeds" });
    });
};
