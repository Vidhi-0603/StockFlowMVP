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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(`/products/${id}`);
      if (data) setForm(data);
    };
    fetchProduct();
  }, [id]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.sku.trim()) errs.sku = "SKU is required";
    if (form.quantity < 0) errs.quantity = "Quantity cannot be negative";
    if (!form.costPrice || form.costPrice <= 0)
      errs.costPrice = "Valid cost price required";
    if (!form.sellingPrice || form.sellingPrice <= 0)
      errs.sellingPrice = "Valid selling price required";
    if (!form.lowStockThreshold || form.lowStockThreshold < 0)
      errs.lowStockThreshold = "Valid threshold required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    try {
      await API.put(`/products/${id}`, form);
      alert("Product updated successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Error updating product");
    }
  };

  const field = (label, key, type = "text") => (
    <div className="mb-4">
      <input
        type={type}
        placeholder={label}
        value={form[key]}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        onChange={(e) => {
          setForm({
            ...form,
            [key]: type === "number" ? Number(e.target.value) : e.target.value,
          });
          setErrors({ ...errors, [key]: "" });
        }}
      />
      {errors[key] && (
        <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-lg p-8 w-full max-w-md shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          {field("Name", "name")}
          {field("SKU", "sku")}
          {field("Quantity", "quantity", "number")}
          {field("Cost Price", "costPrice", "number")}
          {field("Selling Price", "sellingPrice", "number")}
          {field("Low Stock Threshold", "lowStockThreshold", "number")}
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="text-sm border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
