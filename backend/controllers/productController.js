import cloudinary from "../config/cloudinary.js";
import productModel from "../models/productModel.js";

// ---------- Add Product ----------
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
    let imagesUrl = [];

    if (req.files) {
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: "products" });
        imagesUrl.push(result.secure_url);
      }
    }

    const product = new productModel({
      name,
      description,
      price: Number(price),
      images: JSON.stringify(imagesUrl),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
      date: Date.now()
    });

    await product.save();
    res.json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------- List Products ----------
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------- Remove Product ----------
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.productId);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------- Single Product ----------
const singleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ---------- Update Product ----------
const updateProduct = async (req, res) => {
  try {
    const { productId, name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // Update images if new files uploaded
    let imagesUrl = product.images ? JSON.parse(product.images) : [];
    if (req.files && req.files.length > 0) {
      imagesUrl = [];
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: "products" });
        imagesUrl.push(result.secure_url);
      }
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? Number(price) : product.price;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.sizes = sizes ? JSON.parse(sizes) : product.sizes;
    product.bestseller = bestseller !== undefined ? bestseller === "true" : product.bestseller;
    product.images = JSON.stringify(imagesUrl);

    await product.save();
    res.json({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct, updateProduct };
