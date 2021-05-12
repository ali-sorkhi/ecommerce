import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getProductsByCount } from "../../functions/product";
import { LoadingOutlined } from "@ant-design/icons";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        console.log(JSON.stringify(res));
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div>
          {loading ? (
            <LoadingOutlined></LoadingOutlined>
          ) : (
            <h1>All Products</h1>
          )}
        </div>
        <div className="col">
          {products.map((p) => (
            <div>{p.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
