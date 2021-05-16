import React from "react";
import { Button, Select } from "antd";

const { Option } = Select;

export default function ProductUpdateForm({
  handleChange,
  handleSubmit,
  setValues,
  values,
  loading,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubIds,
  setArrayOfSubIds,
  selectedCategory,
}) {
  //destructure  to use title instead of values.title => title=value.title
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Shipping</label>
        <select
          value={shipping}
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <select
          value={color}
          name="color"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Brand</label>
        <select
          value={brand}
          name="brand"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Category</label>
        <select
          value={selectedCategory ? selectedCategory : category._id}
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
        >
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>Sub Category</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="please Select"
          value={arrayOfSubIds}
          onChange={(value) => setArrayOfSubIds(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>

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
    </form>
  );
}
