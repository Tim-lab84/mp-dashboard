import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import productData from "./../../product-data-new.json";

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productData); // Use imported product data
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    images: [],
  });
  const [addingProduct, setAddingProduct] = useState(false); // Track if we're adding a product

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = productData.filter(
      (product) =>
        product.title.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
      images: product.images,
    });
  };

  const handleSave = () => {
    const updatedProducts = filteredProducts.map((product) =>
      product.id === editingProduct.id ? { ...product, ...formData } : product
    );
    setFilteredProducts(updatedProducts);
    setEditingProduct(null); // Close the edit form
  };

  const handleDelete = (productId) => {
    const updatedProducts = filteredProducts.filter(
      (product) => product.id !== productId
    );
    setFilteredProducts(updatedProducts);
  };

  const handleView = (product) => {
    setViewingProduct(product);
  };

  const handleCloseView = () => {
    setViewingProduct(null); // Close detail view and return to list
  };

  const handleAddProduct = () => {
    setAddingProduct(true); // Trigger the Add Product form
    setFormData({
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: "",
      category: "",
      images: [],
    });
  };

  const handleSaveNewProduct = () => {
    const newProduct = { ...formData, id: Date.now() }; // Assign a new ID based on timestamp
    setFilteredProducts([...filteredProducts, newProduct]);
    setAddingProduct(false); // Close the Add Product form
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={handleAddProduct}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add New Product
        </button>
      </div>

      {/* Display the product list if no product is being edited or viewed */}
      {!editingProduct && !viewingProduct && !addingProduct ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="size-10 rounded-full"
                    />
                    {product.title}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => handleView(product)} // View product details
                      className="text-blue-400 hover:text-blue-300 mr-2"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-indigo-400 hover:text-indigo-300 mr-2"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : viewingProduct ? (
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            Product Details
          </h3>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Title
              </label>
              <p className="text-gray-100">{viewingProduct.title}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <p className="text-gray-100">{viewingProduct.description}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Price
              </label>
              <p className="text-gray-100">
                ${viewingProduct.price.toFixed(2)}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Stock
              </label>
              <p className="text-gray-100">{viewingProduct.stock}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Category
              </label>
              <p className="text-gray-100">{viewingProduct.category}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Brand
              </label>
              <p className="text-gray-100">{viewingProduct.brand}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Images
              </label>
              <p className="text-gray-100">
                {viewingProduct.images.join(", ")}
              </p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleCloseView} // Close detail view and return to list
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      ) : editingProduct ? (
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            Edit Product
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Title
              </label>
              <input
                type="text"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Price
              </label>
              <input
                type="number"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Discount Percentage
              </label>
              <input
                type="number"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.discountPercentage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountPercentage: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Rating
              </label>
              <input
                type="number"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Stock
              </label>
              <input
                type="number"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: parseInt(e.target.value) })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Brand
              </label>
              <input
                type="text"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Category
              </label>
              <input
                type="text"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Images
              </label>
              <input
                type="text"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.images.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    images: e.target.value
                      .split(",")
                      .map((image) => image.trim()),
                  })
                }
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 rounded-md text-white"
              >
                Save
              </button>
            </div>
          </form>
        </motion.div>
      ) : addingProduct ? (
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            Add New Product
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveNewProduct();
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Title
              </label>
              <input
                type="text"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Price
              </label>
              <input
                type="number"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Discount Percentage
              </label>
              <input
                type="number"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.discountPercentage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountPercentage: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Rating
              </label>
              <input
                type="number"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Stock
              </label>
              <input
                type="number"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: parseInt(e.target.value) })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Brand
              </label>
              <input
                type="text"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Category
              </label>
              <input
                type="text"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Images
              </label>
              <input
                type="text"
                className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
                value={formData.images.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    images: e.target.value
                      .split(",")
                      .map((image) => image.trim()),
                  })
                }
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setAddingProduct(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 rounded-md text-white"
              >
                Save New Product
              </button>
            </div>
          </form>
        </motion.div>
      ) : null}
    </motion.div>
  );
};

export default ProductsTable;
