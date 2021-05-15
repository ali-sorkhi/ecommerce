import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import { LoadingOutlined } from "@ant-design/icons";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

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

  const handleRemove = (slug) => {
    let answer = window.confirm("Delete?");
    if (answer) {
      removeProduct(slug, user.token, user.email)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is Delete`);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <div>
            {loading ? (
              <LoadingOutlined></LoadingOutlined>
            ) : (
              <h1>All Products</h1>
            )}
          </div>
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 pb-3" key={product._id}>
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
