import Order from "../models/Order.js";

// ==========================
// GET ALL ORDERS
// ==========================

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Get All Orders Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================
// GET SINGLE ORDER
// ==========================

export const getAdminOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    console.error("Get Admin Order Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================
// UPDATE ORDER STATUS
// ==========================

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { orderStatus } = req.body;

    // ==========================
    // VALID STATUS
    // ==========================

    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    // ==========================
    // FIND ORDER
    // ==========================

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // ==========================
    // UPDATE ORDER STATUS
    // ==========================

    order.orderStatus = orderStatus;

    // ==========================
    // COD PAYMENT STATUS
    // ==========================

    if (order.paymentMethod === "cod" && orderStatus === "Delivered") {
      order.paymentStatus = "Paid";
    }

    // ==========================
    // SAVE ORDER
    // ==========================

    await order.save();

    // ==========================
    // RESPONSE
    // ==========================

    res.status(200).json({
      message: "Order status updated successfully",

      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);

    res.status(500).json({
      message: "Server error",

      error: error.message,
    });
  }
};
