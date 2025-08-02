

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import houseModel from "../models/houseModel.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_EC2vykLmImyhtG",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "J6kg4yEPRpNG93aUoUHHZlsk",
});

// Helper function to fetch cart items from `cartData`
const getCartItemsDetails = async (cartData) => {
  const itemIds = Object.keys(cartData);
  const items = await houseModel.find({ _id: { $in: itemIds } });
  return items.map((item) => ({
    _id: item._id,
    name: item.name,
    price: item.price,
    quantity: cartData[item._id] || 0,
  }));
};



const placeOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;

    // Fetch user's cart data
    const userData = await userModel.findById(userId);
    if (!userData || !userData.cartData) {
      return res.status(400).json({ success: false, message: "Cart is empty." });
    }

    // Fetch cart item details
    const items = await getCartItemsDetails(userData.cartData);
    const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create order
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      status: "Order placed",
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.status(500).json({ success: false, message: "Failed to place order." });
  }
};

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, address } = req.body;

    // Fetch user's cart data
    const userData = await userModel.findById(userId);
    if (!userData || !userData.cartData) {
      return res.status(400).json({ success: false, message: "Cart is empty." });
    }

    // Fetch cart item details
    const items = await getCartItemsDetails(userData.cartData);
    const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Amount in paise
      currency: "INR",
    };
    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Save order to database
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
      status: "Pending",
      paymentOrderId: razorpayOrder.id,
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    res.json({
      success: true,
      message: "Razorpay order created successfully",
      order: razorpayOrder,
    });
  } catch (error) {
    console.error("Error in placeOrderRazorpay:", error);
    res.status(500).json({ success: false, message: "Failed to create Razorpay order." });
  }
};


// Verify payment
const verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const updatedOrder = await orderModel.findOneAndUpdate(
      { paymentOrderId: orderId },
      { payment: true, status: "Paid" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    res.json({ success: true, message: "Payment verified successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    res.status(500).json({ success: false, message: "Failed to verify payment." });
  }
};


// Fetch orders of a specific user
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });

    // Populate each order's items with product images
    for (const order of orders) {
      const populatedItems = await Promise.all(
        order.items.map(async (item) => {
          const product = await houseModel.findById(item._id).select("images");  // Ensure images are selected
          if (product) {
            return { ...item, image: product.images };  // Add the images field to the item
          }
          return item;
        })
      );
      order.items = populatedItems;  // Set populated items back in the order
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error in userOrders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user orders." });
  }
};


// Fetch all orders for the admin
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate("userId", "name email");
    
    // Populate images for each item in the orders
    for (const order of orders) {
      for (const item of order.items) {
        const product = await houseModel.findById(item._id).select("images");
        item.image = product.images || []; // Add the images to the item
      }
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error in allOrders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders." });
  }
};

// Update order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    res.json({ success: true, message: "Order status updated successfully.", order: updatedOrder });
  } catch (error) {
    console.error("Error in updateStatus:", error);
    res.status(500).json({ success: false, message: "Failed to update order status." });
  }
};

// Cancel an order
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const deletedOrder = await orderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    res.json({ success: true, message: "Order canceled successfully." });
  } catch (error) {
    console.error("Error in cancelOrder:", error);
    res.status(500).json({ success: false, message: "Failed to cancel order." });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  verifyPayment,
  allOrders,
  userOrders,
  updateStatus,
  cancelOrder,
};
