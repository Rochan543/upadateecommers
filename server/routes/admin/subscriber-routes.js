const express = require("express");
const {
  addSubscriber,
  getSubscribers,
} = require("../../controllers/admin/subscriber-controller");

const router = express.Router();

router.post("/add", addSubscriber);
router.get("/list", getSubscribers);

module.exports = router;
