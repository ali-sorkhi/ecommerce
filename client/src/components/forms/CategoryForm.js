import React from "react";
import { Button } from "antd";

const CategoryForm = ({ handleSubmit, name, setName, loading }) => (
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

export default CategoryForm;
