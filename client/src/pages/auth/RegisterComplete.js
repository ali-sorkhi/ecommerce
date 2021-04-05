import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const RegisterComplete = (
  { history } /*we can access history cuz RegisterComplete is a route*/
) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //to redirect if user is loged in:
  let { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);
  // ...

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []); //runs the func every time componnets mount or dependencie array [] changes

  const handleSubmit = async (e) => {
    e.preventDefault(); //preventing to reload page

    //validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return; //to stop belove codes to be executed
    }
    if (password.length < 6) {
      toast.error("password must be at least 6 characters long");
      return; //to stop belove codes to be executed
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        //rempve user email from local storage
        window.localStorage.removeItem("emailForRegistration");

        //get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        //redux store

        //redirect
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegisterationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} autoFocus />
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          autoFocus
        />
        <br />
        <button type="submit" className="btn btn-raised">
          Complete Registeration
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5 " /*bootstrap class*/>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {completeRegisterationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
