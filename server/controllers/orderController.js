import Order from "../models/Order.js";
import Product from "../models/Product.js";


// ======================================================
// CREATE ORDER
// ======================================================

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount, paymentId } =
      req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one product",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        message: "Shipping address is required",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        message: "Payment method is required",
      });
    }

    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      return res.status(400).json({
        message: "Valid total amount is required",
      });
    }

    // ==========================================
    // CHECK PRODUCTS
    // ==========================================

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.name}`,
        });
      }
    }

    // ==========================================
    // PAYMENT STATUS
    // ==========================================

    const paymentStatus = paymentMethod === "razorpay" ? "Paid" : "Pending";

    // ==========================================
    // CREATE ORDER
    // ==========================================

    const order = await Order.create({
      user: req.user._id,

      items,

      shippingAddress,

      paymentMethod,

      totalAmount,

      paymentStatus,

      paymentId: paymentMethod === "razorpay" ? paymentId : undefined,
    });

    res.status(201).json({
      message: "Order created successfully",

      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      message: "Server error",

      error: error.message,
    });
  }
};

// ======================================================
// GET MY ORDERS
// ======================================================

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Orders fetched successfully",

      orders,
    });
  } catch (error) {
    console.error("Get My Orders Error:", error);

    res.status(500).json({
      message: "Server error",

      error: error.message,
    });
  }
};

// ======================================================
// GET SINGLE ORDER
// ======================================================

export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,

      user: req.user._id,
    });

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
    console.error("Get Single Order Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    res.status(500).json({
      message: "Server error",

      error: error.message,
    });
  }
};

// ======================================================
// CANCEL MY ORDER
// ======================================================

export const cancelMyOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // FIND USER ORDER
    // ==========================================

    const order = await Order.findOne({
      _id: id,

      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // ==========================================
    // ALREADY CANCELLED
    // ==========================================

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        message: "Order is already cancelled",
      });
    }

    // ==========================================
    // CANCELLATION RULE
    // ==========================================

    const cancellableStatuses = ["Pending", "Processing"];

    if (!cancellableStatuses.includes(order.orderStatus)) {
      return res.status(400).json({
        message: `Order cannot be cancelled because it is already ${order.orderStatus.toLowerCase()}.`,
      });
    }

    // ==========================================
    // CANCEL ORDER
    // ==========================================

    order.orderStatus = "Cancelled";

    // ==========================================
    // RAZORPAY
    // ==========================================
    // Abhi automatic refund nahi kar rahe.
    // Payment status Paid hi rahega.
    // Refund ke liye separate Razorpay
    // refund API lagani hogi.

    await order.save();

    res.status(200).json({
      message: "Order cancelled successfully",

      order,
    });
  } catch (error) {
    console.error("Cancel Order Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    res.status(500).json({
      message: "Server error",

      error: error.message,
    });
  }
};

// ======================================================
// GET ALL ORDERS - ADMIN
// ======================================================

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "All orders fetched successfully",

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

// ======================================================
// UPDATE ORDER STATUS - ADMIN
// ======================================================

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { orderStatus } = req.body;

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

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    // ==========================================
    // COD DELIVERED = PAID
    // ==========================================

    if (order.paymentMethod === "cod" && orderStatus === "Delivered") {
      order.paymentStatus = "Paid";
    }

    await order.save();

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
