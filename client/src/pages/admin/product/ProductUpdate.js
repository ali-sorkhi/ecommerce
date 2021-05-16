import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
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

export default function ProductUpdate(props) {
  //states:
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);

  //redux:
  const { user } = useSelector((state) => ({ ...state }));

  //destructure:
  const { slug } = props.match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = (res) => {
    getProduct(slug).then((p) => {
      //load single product
      setValues({ ...values, ...p.data });
      //load category subs
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      setArrayOfSubIds((prev) => arr); // requiered for antd
    });
  };

  const loadCategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaveLoading(true);

    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token, user.email)
      .then((res) => {
        setSaveLoading(false);
        toast.success(`"${res.data.title}" is created`);
        props.history.push("/admin/products")
      })
      .catch((err) => {
        console.log(err);
        setSaveLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
      })
      .catch();

    if (values.category._id === e.target.value) loadProduct();
    setArrayOfSubIds([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Product Update</h4>
          <hr />
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
          <ProductUpdateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setValues={setValues}
            values={values}
            loading={saveLoading}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
}
