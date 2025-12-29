const express = require("express");
const {
  getAllUsersForAdmin,
  getOrdersByUserIdForAdmin,
} = require("../../controllers/admin/user-controller");

const router = express.Router();

router.get("/get", getAllUsersForAdmin);
router.get("/:userId/orders", getOrdersByUserIdForAdmin);

module.exports = router;
