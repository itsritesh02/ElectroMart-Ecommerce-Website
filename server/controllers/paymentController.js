import razorpay from "../utils/razorpay.js";

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        message: "Amount is required",
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({
      message: "Razorpay order created",
      order,
    });
  } catch (error) {
    console.error("Payment Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
