import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "white", "Blue"], //options to choose
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "", // chosed option
  brand: "",
};

export default function ProductCreate() {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => {
      setValues({ ...values, categories: c.data });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createProduct(values, user.token, user.email)
      .then((res) => {
        setLoading(false);
        //to reload the page(empty the fields) after the alert:
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values,subs:[], category: e.target.value });
    getCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
      })
      .catch();

    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product create</h4>
          <hr />
          <ProductCreateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setValues={setValues}
            values={values}
            loading={loading}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub} 
          />
        </div>
      </div> 
    </div>
  );
}
