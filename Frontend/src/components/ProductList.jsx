import { useEffect, useState } from "react";
import API from "../axiosInstance";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  const editProduct = async (id) => {
    navigate(`/edit-product/${id}`);
  };
  return (
    <div>
      <h2>Products</h2>

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

export default ProductList;
