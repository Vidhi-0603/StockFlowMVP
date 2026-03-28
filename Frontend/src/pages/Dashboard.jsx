import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";


function Dashboard() {
    const navigate = useNavigate();

  return (
    <>
      <h1>Dashboard (Protected)</h1>
      <button onClick={() => navigate("/add-product")}>Add Product</button>{" "}
      <ProductList />
    </>
  );
}

export default Dashboard;
