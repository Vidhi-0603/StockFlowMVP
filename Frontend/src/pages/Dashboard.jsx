import { useEffect, useState } from "react";
import LowStockProducts from "../components/LowStockProducts";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";
import API from "../axiosInstance";

function Dashboard() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const fetchDashboardData = async () => {
    const { data } = await API.get("/dashboard");
    setAllProducts(data.products);
    setLowStockProducts(data.lowStock);
    setTotalProducts(data.totalProducts);
    setTotalQuantity(data.totalQuantity);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button
          onClick={() => navigate("/settings")}
          className="text-sm border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-100 transition"
        >
          Settings
        </button>
      </div>

      <div className="flex gap-6 mb-6">
        <div className="border border-gray-200 rounded-lg px-5 py-4 flex-1">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-semibold">{totalProducts}</p>
        </div>
        <div className="border border-gray-200 rounded-lg px-5 py-4 flex-1">
          <p className="text-sm text-gray-500">Total Quantity</p>
          <p className="text-2xl font-semibold">{totalQuantity}</p>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/add-product")}
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          + Add Product
        </button>
      </div>

      <ProductList products={allProducts} refresh={fetchDashboardData} />

      <div className="mt-8">
        <LowStockProducts
          products={lowStockProducts}
          refresh={fetchDashboardData}
        />
      </div>
    </div>
  );
}

export default Dashboard;
