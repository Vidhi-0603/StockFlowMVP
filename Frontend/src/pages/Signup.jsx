import { useState } from "react";
import API from "../axiosInstance";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    organizationName: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Valid email required";
    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (!form.organizationName.trim())
      errs.organizationName = "Organization name is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    try {
      const { data } = await API.post("/auth/signup", form);
      console.log(data.message);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const field = (label, key, type = "text") => (
    <div className="mb-4">
      <input
        type={type}
        placeholder={label}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        onChange={(e) => {
          setForm({ ...form, [key]: e.target.value });
          setErrors({ ...errors, [key]: "" });
        }}
      />
      {errors[key] && (
        <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-lg p-8 w-full max-w-sm shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
          {field("Email", "email")}
          {field("Password", "password", "password")}
          {field("Organization Name", "organizationName")}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded text-sm hover:bg-gray-700 transition"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-gray-900 underline hover:text-gray-600"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
