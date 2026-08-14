
import crypto from "crypto";
import razorpay from "../utils/razorpay.js";

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Valid amount is required",
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({
      message: "Razorpay order created",
      order,
    });
  } catch (error) {
    console.error(
      "Create Razorpay Order Error:",
      error
    );

    res.status(500).json({
      message: "Unable to create payment order",
      error: error.message,
    });
  }
};

export const verifyRazorpayPayment = async (
  req,
  res
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message: "Payment verification data is missing",
      });
    }

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(body)
        .digest("hex");

    const isValid =
      expectedSignature ===
      razorpay_signature;

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid payment signature",
        verified: false,
      });
    }

    res.status(200).json({
      message: "Payment verified successfully",
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error(
      "Verify Razorpay Payment Error:",
      error
    );

    res.status(500).json({
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

