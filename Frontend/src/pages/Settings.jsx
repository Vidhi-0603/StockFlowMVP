import { useEffect, useState } from "react";
import API from "../axiosInstance";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [threshold, setThreshold] = useState(5);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      const res = await API.get("/settings");
      setThreshold(res.data.defaultLowStockThreshold);
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!threshold || threshold < 0)
      return setError("Threshold must be 0 or greater");
    setError("");
    await API.put("/settings", { defaultLowStockThreshold: Number(threshold) });
    alert("Settings updated");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-lg p-8 w-full max-w-sm shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm text-gray-600 mb-1">
              Default Low Stock Threshold
            </label>
            <input
              type="number"
              value={threshold}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              onChange={(e) => {
                setThreshold(e.target.value);
                setError("");
              }}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="text-sm border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
