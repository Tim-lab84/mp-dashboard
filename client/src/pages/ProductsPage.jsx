import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ProductsTable from "../components/products/ProductsTable";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductsPage = () => {
  const [productData, setProductData] = useState({
    productsLength: 0,
    lowStockProductsLength: 0,
  });
  useEffect(() => {
    const API_URL = "http://localhost:5000/api/products";
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response.data);
        setProductData({
          productsLength: response.data.length,
          lowStockProductsLength: response.data.filter(
            (product) => product.stock <= 5
          ).length,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const { productsLength, lowStockProductsLength } = productData;
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Products" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Products"
            icon={Package}
            value={productsLength}
            color="#6366F1"
          />
          <StatCard
            name="Top Selling"
            icon={TrendingUp}
            value={89}
            color="#10B981"
          />
          <StatCard
            name="Low Stock"
            icon={AlertTriangle}
            value={lowStockProductsLength}
            color="#F59E0B"
          />
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value={"$543,210"}
            color="#EF4444"
          />
        </motion.div>

        <ProductsTable />

        {/* CHARTS */}
        <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          <SalesTrendChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};
export default ProductsPage;
