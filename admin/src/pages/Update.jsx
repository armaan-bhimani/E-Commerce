import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Update = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: "",
    bestseller: false,
  });

  // Fetch single product
  const fetchProduct = async () => {
    try {
      const res = await axios.post(`${backend_url}/api/products/single`, { productId: id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const product = res.data.product;
      setProductData(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        subCategory: product.subCategory,
        sizes: JSON.stringify(product.sizes),
        bestseller: product.bestseller,
      });
      setImages(JSON.parse(product.images));
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("productId", id);
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      images.forEach((img) => data.append("images", img));

      const res = await axios.put(`${backend_url}/api/products/update`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);
      navigate("/list");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  if (!productData) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full border p-2 rounded" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full border p-2 rounded" required />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full border p-2 rounded" />
        <input type="text" name="subCategory" value={formData.subCategory} onChange={handleChange} placeholder="Sub Category" className="w-full border p-2 rounded" />
        <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} placeholder='Sizes as JSON, e.g. ["S","M"]' className="w-full border p-2 rounded" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="bestseller" checked={formData.bestseller} onChange={handleChange} />
          Bestseller
        </label>

        <input type="file" multiple onChange={handleImageChange} />

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default Update;
