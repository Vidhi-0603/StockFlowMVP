import { useState } from "react";
import API from "../axiosInstance";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    organizationName: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/signup", form);
      console.log(data.message);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input
        placeholder="Organization Name"
        onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
      />

      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
