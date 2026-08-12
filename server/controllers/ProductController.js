import Product from "../models/Product.js";

// ==========================
// ADD PRODUCT
// ==========================

export const addProduct = async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    // Check required fields
    if (!name || !price || !category || !description || !image) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Create product
    const product = await Product.create({
      name,
      price,
      category,
      description,
      image,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add Product Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================
// GET ALL PRODUCTS
// ==========================

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================
// GET SINGLE PRODUCT
// ==========================

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error("Get Single Product Error:", error);

    // Invalid MongoDB ID
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================
// UPDATE PRODUCT
// ==========================

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, price, category, description, image } = req.body;

    // Check required fields
    if (!name || !price || !category || !description || !image) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category,
        description,
        image,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================
// DELETE PRODUCT
// ==========================

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
