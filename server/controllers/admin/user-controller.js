const User = require("../../models/User");
const Order = require("../../models/Order");

/**
 * GET ALL USERS (ADMIN)
 */
const getAllUsersForAdmin = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

/**
 * GET ALL ORDERS OF A SPECIFIC USER
 */
const getOrdersByUserIdForAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = {
  getAllUsersForAdmin,
  getOrdersByUserIdForAdmin,
};
