import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const Collections = () => {
  const { products } = useContext(ShopContext); // use products from backend
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // 'low-high', 'high-low', 'newest', 'oldest'
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 8; 

  // Filter, search, and sort products
  const filteredProducts = products
    .filter(p => (categoryFilter ? p.category === categoryFilter : true))
    .filter(p => (typeFilter ? p.subCategory === typeFilter : true))
    .filter(p => (searchTerm ? p.name.toLowerCase().includes(searchTerm.toLowerCase()) : true))
    .sort((a, b) => {
      if (sortOrder === 'low-high') return a.price - b.price;
      if (sortOrder === 'high-low') return b.price - a.price;
      if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortOrder === 'oldest') return new Date(a.date) - new Date(b.date);
      return 0;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper function to parse images safely
  const getImages = (product) => {
    if (!product.images) return [];
    try {
      return typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
    } catch (err) {
      console.error('Failed to parse images for product:', product._id, err);
      return [];
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4 space-y-4">
          <div className="border border-gray-200 p-3 rounded-md shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Search</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search products..."
              className="w-full border p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div className="border border-gray-200 p-3 rounded-md shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Category</h3>
            <div className="space-y-1">
              {['Men', 'Women', 'Kids'].map(cat => (
                <p
                  key={cat}
                  onClick={() => { setCategoryFilter(cat); setCurrentPage(1); }}
                  className={`cursor-pointer text-sm px-2 py-1 rounded ${
                    categoryFilter === cat
                      ? 'font-bold text-white bg-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </p>
              ))}
              <p onClick={() => { setCategoryFilter(''); setCurrentPage(1); }} className="cursor-pointer text-gray-400 text-xs">Clear</p>
            </div>
          </div>

          <div className="border border-gray-200 p-3 rounded-md shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Type</h3>
            <div className="space-y-1">
              {['Topwear', 'Bottomwear', 'Winterwear'].map(type => (
                <p
                  key={type}
                  onClick={() => { setTypeFilter(type); setCurrentPage(1); }}
                  className={`cursor-pointer text-sm px-2 py-1 rounded ${
                    typeFilter === type
                      ? 'font-bold text-white bg-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {type}
                </p>
              ))}
              <p onClick={() => { setTypeFilter(''); setCurrentPage(1); }} className="cursor-pointer text-gray-400 text-xs">Clear</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-12 h-0.5 bg-black"></div>
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold">ALL COLLECTIONS</h2>
            </div>

            <select
              value={sortOrder}
              onChange={e => { setSortOrder(e.target.value); setCurrentPage(1); }}
              className="border p-2 rounded text-sm mt-4 sm:mt-0"
            >
              <option value="">Sort by</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <ProductItem
                  key={product._id}
                  id={product._id}
                  image={getImages(product)}
                  name={product.name}
                  price={product.price}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No products found.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === page
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-900 border-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
