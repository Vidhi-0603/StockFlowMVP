import { useState } from "react";
import API from "../axiosInstance";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    sku: "",
    description: "",
    quantity: 0,
    costPrice: "",
    sellingPrice: "",
    lowStockThreshold: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products/add", form);

      alert("Product added successfully");

      // redirect back to dashboard
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Error adding product");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="SKU"
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
        />
        <input
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) =>
            setForm({ ...form, quantity: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Cost Price"
          onChange={(e) =>
            setForm({ ...form, costPrice: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Selling Price"
          onChange={(e) =>
            setForm({ ...form, sellingPrice: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Low Stock Threshold"
          onChange={(e) =>
            setForm({ ...form, lowStockThreshold: Number(e.target.value) })
          }
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
