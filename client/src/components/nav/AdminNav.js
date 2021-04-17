import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/product" className="nav-link">
            Product
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/products" className="nav-link">
            Products
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/category" className="nav-link">
            Category
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/sub" className="nav-link">
            Sub Category
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/user/password" className="nav-link">
            Password
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
