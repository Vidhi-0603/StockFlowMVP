import { useEffect, useState } from "react";
import API from "../axiosInstance";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [threshold, setThreshold] = useState(5);
  const navigate = useNavigate();

  // fetch current value
  useEffect(() => {
    const fetchSettings = async () => {
      const res = await API.get("/settings");
      setThreshold(res.data.defaultLowStockThreshold);
    };

    fetchSettings();
  }, []);

  // update
  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.put("/settings", {
      defaultLowStockThreshold: Number(threshold),
    });

    alert("Settings updated");
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Settings</h2>

      <form onSubmit={handleSubmit}>
        <label>Default Low Stock Threshold</label>

        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>

      <button onClick={() => navigate("/dashboard")}>Back</button>
    </div>
  );
}

export default Settings;
