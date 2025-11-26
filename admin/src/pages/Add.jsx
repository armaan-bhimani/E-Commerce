import React, { useState } from "react";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------------------------
  // HANDLE IMAGE UPLOAD
  // ---------------------------
  const handleImageChange = (e, index) => {
    const copy = [...images];
    copy[index] = e.target.files[0];
    setImages(copy);
  };

  // ---------------------------
  // TOGGLE SIZE BUTTONS
  // ---------------------------
  const handleSizeToggle = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  // ---------------------------
  // SUBMIT PRODUCT
  // ---------------------------
  const handleSubmit = async () => {
    if (!token) return toast.error("You must be logged in!");
    if (!name || !description || !price || !category || !subCategory)
      return toast.error("Fill all required fields!");
    if (sizes.length === 0) return toast.error("Choose at least one size!");
    if (!images.some((img) => img)) return toast.error("Upload at least one image!");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);
      // GET
      // resp = API
      // const copy = JSON.parse(resp.data.images)
      // ["url1", "url2"]
      // for(img in copy)
      //   <Image src={img} />>
      // append images
      images.forEach((img, index) => {
        if (img) {
          // backend expects "images"
          formData.append("images", img);
        }
      });

      await axios.post(`${backend_url}/api/products/add`, formData, {
        headers: { token },
      });

      toast.success("Product added!");

      // RESET FORM
      setImages([null, null, null, null]);
      setName("");
      setDescription("");
      setCategory("");
      setSubCategory("");
      setPrice("");
      setSizes([]);
      setBestseller(false);

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
      console.log("Add error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="w-full h-full p-4 md:p-6 overflow-y-auto">
    <h2 className="text-xl md:text-2xl font-bold mb-4">Add New Product</h2>

    {/* Images */}
    <div className="mb-4">
      <label className="font-medium text-sm md:text-base">Upload Images</label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full h-24 sm:h-28 border rounded-md flex items-center justify-center bg-gray-100 cursor-pointer"
            onClick={() => document.getElementById(`img${index}`).click()}
          >
            {img ? (
              <img
                src={URL.createObjectURL(img)}
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <span className="text-xs text-gray-500">Upload</span>
            )}

            <input
              type="file"
              id={`img${index}`}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
            />
          </div>
        ))}
      </div>
    </div>

    {/* Product Name */}
    <div className="mb-4">
      <label className="font-medium text-sm md:text-base">Product Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded-md mt-1"
        placeholder="Cotton T-Shirt"
      />
    </div>

    {/* Description */}
    <div className="mb-4">
      <label className="font-medium text-sm md:text-base">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded-md mt-1"
        placeholder="Product details"
      />
    </div>

    {/* Category Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
      <div>
        <label className="font-medium text-sm md:text-base">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded-md mt-1 bg-white"
        >
          <option value="">Select</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      {/* Subcategory */}
      <div>
        <label className="font-medium text-sm md:text-base">Sub Category</label>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded-md mt-1 bg-white"
        >
          <option value="">Select</option>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>
    </div>

    {/* Price */}
    <div className="mb-4">
      <label className="font-medium text-sm md:text-base">Price</label>
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        className="w-full border px-3 py-2 rounded-md mt-1"
        placeholder="499"
      />
    </div>

    {/* Sizes */}
    <label className="font-medium text-sm md:text-base">Sizes</label>
    <div className="flex flex-wrap gap-2 my-2">
      {["S", "M", "L", "XL", "XXL"].map((size) => (
        <button
          key={size}
          onClick={() => handleSizeToggle(size)}
          className={`px-4 py-1 rounded-md border text-sm ${
            sizes.includes(size)
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          {size}
        </button>
      ))}
    </div>

    {/* Bestseller */}
    <div className="mb-4 flex items-center gap-2">
      <input
        type="checkbox"
        checked={bestseller}
        onChange={(e) => setBestseller(e.target.checked)}
      />
      <span className="text-sm md:text-base">Mark as Bestseller</span>
    </div>

    <button
      onClick={handleSubmit}
      disabled={loading}
      className="w-full bg-black text-white py-3 rounded-md mt-3 text-sm md:text-base disabled:bg-gray-400"
    >
      {loading ? "Adding..." : "Add Product"}
    </button>
  </div>
);

};

export default Add;
