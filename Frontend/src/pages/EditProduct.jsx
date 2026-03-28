import { useEffect, useState } from "react";
import API from "../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    sku: "",
    quantity: 0,
    costPrice: "",
    sellingPrice: "",
    lowStockThreshold: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(`/products/${id}`);
      if (data) {
        setForm(data);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, form);
      alert("Product updated successfully");
      // redirect back to dashboard
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Error updating product");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Cost Price"
          value={form.costPrice}
          onChange={(e) =>
            setForm({ ...form, costPrice: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Selling Price"
          value={form.sellingPrice}
          onChange={(e) =>
            setForm({ ...form, sellingPrice: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Low Stock Threshold"
          value={form.lowStockThreshold}
          onChange={(e) =>
            setForm({ ...form, lowStockThreshold: Number(e.target.value) })
          }
        />

        <button type="submit">Edit Product</button>
      </form>
      <button onClick={() => navigate("/dashboard")}>Back</button>
    </div>
  );
}

export default EditProduct;
