import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        toast.success("password has been changed");
        setPassword("");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          disabled={loading}
          placeholder="Enter new password"
          value={password}
        />
        {!loading ? (
          <Button
            onClick={handleSubmit}
            type="primary"
            className="mb-3"
            shape="round"
            size="large"
            disabled={password.length<6}
          >
            Change my Password
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            type="primary"
            className="mb-3"
            shape="round"
            size="large"
            disabled
            loading={loading}
          >
            Loading Please Wait
          </Button>
        )}
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">{passwordUpdateForm()}</div>
      </div>
    </div>
  );
};

export default Password;
