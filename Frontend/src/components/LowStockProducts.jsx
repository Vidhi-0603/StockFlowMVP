import API from "../axiosInstance";
import { useNavigate } from "react-router-dom";

function LowStockProducts({ products, refresh }) {
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await API.delete(`/products/${id}`);
      refresh();
    } catch {
      alert("Error deleting product");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Low Stock Products</h2>
      {products.length === 0 ? (
        <p className="text-sm text-gray-500">No low stock products.</p>
      ) : (
        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-red-50 text-gray-600 text-left">
              <tr>
                {["Name", "SKU", "Quantity", "Threshold", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-2 font-medium border-b border-gray-200"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.sku}</td>
                  <td className="px-4 py-2 text-red-500 font-medium">
                    {p.quantity}
                  </td>
                  <td className="px-4 py-2">{p.lowStockThreshold}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-product/${p.id}`)}
                      className="text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-100 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="text-xs border border-red-200 text-red-500 rounded px-2 py-1 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LowStockProducts;
