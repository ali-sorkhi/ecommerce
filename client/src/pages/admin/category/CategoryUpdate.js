import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { updateCategory, getCategory } from "../../../functions/category";

const CategoryUpdate = ({ history, match /* to accesss slug */ }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCategory = () => {
    getCategory(match.params.slug).then((category) =>
      setName(category.data.name)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          autoFocus
          required
        />
        <br />
        {!loading ? (
          <Button
            onClick={handleSubmit}
            type="primary"
            className="mb-3"
            shape="round"
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            type="primary"
            className="mb-3"
            shape="round"
            disabled
            loading={loading}
          >
            Loading
          </Button>
        )}
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Update Category</h4>
          {categoryForm()}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
