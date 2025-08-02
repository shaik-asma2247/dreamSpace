
import houseModel from "../models/houseModel.js";
import userModel from "../models/userModel.js";

// --- Add to Cart ---
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Check if the user exists
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the product exists
    const product = await houseModel.findById(itemId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Update the cart data
    const cartData = userData.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    // Save updated cart in the user's document
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Product added to cart", cartData });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// --- Get User Cart ---
export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if the user exists
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    // Populate cart data with product details
    const cartItems = await Promise.all(
      Object.keys(cartData).map(async (itemId) => {
        const product = await houseModel.findById(itemId);
        if (product) {
          return { product, quantity: cartData[itemId] };
        }
      })
    );

    // Filter out null values in case of deleted or missing products
    const filteredCartItems = cartItems.filter(Boolean);

    res.json({
      success: true,
      message: "Cart data retrieved",
      cart: filteredCartItems,
    });
  } catch (error) {
    console.error("Error in getUserCart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// --- Update Cart ---
export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    // Check if the user exists
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the product exists
    const product = await houseModel.findById(itemId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const cartData = userData.cartData || {};

    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }

    // Save updated cart in the user's document
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated", cartData });
  } catch (error) {
    console.error("Error in updateCart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// --- Remove from Cart ---
export const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Check if the user exists
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    delete cartData[itemId];

    // Save updated cart in the user's document
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Product removed from cart", cartData });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
