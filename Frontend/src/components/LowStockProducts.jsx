import API from "../axiosInstance";
import { useNavigate } from "react-router-dom";

function LowStockProducts({ products, refresh }) {
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);
      refresh();
    } catch (err) {
      alert("Error deleting product");
    }
  };

  const editProduct = async (id) => {
    navigate(`/edit-product/${id}`);
  };
  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 && <p>No low stock products</p>}
      {products.map((p) => (
        <div key={p.id}>
          {p.name} - {p.quantity}
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
          <button onClick={() => editProduct(p.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default LowStockProducts;
