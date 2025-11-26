import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backend_url}/api/products/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data.products) ? res.data.products : [];
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.post(
        `${backend_url}/api/products/remove`,
        { productId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product");
    }
  };

  // Navigate to Update page
  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  if (loading) return <p className="p-4">Loading products...</p>;
  if (!products.length) return <p className="p-4">No products found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">SubCategory</th>
              <th className="px-4 py-2 text-left">Bestseller</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              let imagesArray = [];
              if (product.images) {
                try {
                  imagesArray =
                    typeof product.images === "string" ? JSON.parse(product.images) : product.images;
                } catch (err) {
                  console.error("Failed to parse images for product:", product._id, err);
                }
              }

              return (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {imagesArray.length > 0 ? (
                      <img
                        src={imagesArray[0]}
                        alt={product.name || "Product Image"}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 rounded">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">{product.name || "Unnamed"}</td>
                  <td className="px-4 py-2">${product.price ?? 0}</td>
                  <td className="px-4 py-2">{product.category || "-"}</td>
                  <td className="px-4 py-2">{product.subCategory || "-"}</td>
                  <td className="px-4 py-2">
                    {product.bestseller ? (
                      <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
