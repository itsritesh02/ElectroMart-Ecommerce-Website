import Order from "../models/Order.js";

// ==========================
// CREATE ORDER
// ==========================

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    // ==========================
    // CHECK ITEMS
    // ==========================

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order items are required",
      });
    }

    // ==========================
    // CHECK SHIPPING ADDRESS
    // ==========================

    if (
      !shippingAddress?.fullName ||
      !shippingAddress?.email ||
      !shippingAddress?.phone ||
      !shippingAddress?.address ||
      !shippingAddress?.city ||
      !shippingAddress?.pincode
    ) {
      return res.status(400).json({
        message: "Complete shipping address is required",
      });
    }

    // ==========================
    // CHECK PAYMENT METHOD
    // ==========================

    if (!paymentMethod || !["cod", "razorpay"].includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method",
      });
    }

    // ==========================
    // CHECK TOTAL
    // ==========================

    if (totalAmount === undefined || totalAmount === null || totalAmount < 0) {
      return res.status(400).json({
        message: "Valid total amount is required",
      });
    }

    // ==========================
    // CREATE ORDER
    // ==========================

    const order = await Order.create({
      user: req.user._id,

      items,

      shippingAddress,

      paymentMethod,

      totalAmount,

      orderStatus: "Pending",

      paymentStatus: paymentMethod === "cod" ? "Pending" : "Pending",
    });

    // ==========================
    // RESPONSE
    // ==========================

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

// ==========================
// GET MY ORDERS
// ==========================

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.product", "name image price")
      .sort({
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

// ==========================
// GET SINGLE ORDER
// ==========================

export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,

      user: req.user._id,
    }).populate("items.product", "name image price");

    // ==========================
    // ORDER NOT FOUND
    // ==========================

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // ==========================
    // RESPONSE
    // ==========================

    res.status(200).json({
      message: "Order fetched successfully",

      order,
    });
  } catch (error) {
    console.error("Get Single Order Error:", error);

    res.status(500).json({
      message: "Server error",

      error: error.message,
    });
  }
};
