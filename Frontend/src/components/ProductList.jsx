import { useEffect, useState } from "react";
import API from "../axiosInstance";

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await API.get("/products/getProducts");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h2>Products</h2>

      {products.map((p) => (
        <div key={p.id}>
          {p.name} - {p.quantity}
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
