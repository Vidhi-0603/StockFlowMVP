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
    <>
      <h1>Dashboard</h1>
      Total Products: {totalProducts}
      <br />
      Total Quantity: {totalQuantity}
      <br />
      <button onClick={() => navigate("/add-product")}>Add Product</button>{" "}
      <ProductList products={allProducts} refresh={fetchDashboardData} />
      <h3>Low Stock Products List:</h3>
      <LowStockProducts
        products={lowStockProducts}
        refresh={fetchDashboardData}
      />
    </>
  );
}

export default Dashboard;
