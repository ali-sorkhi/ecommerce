import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/nav/Header";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import { UserRoutes } from "./components/routes/UserRoutes"; //to use protected routes
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import { AdminRoutes } from "./components/routes/AdminRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";

const App = () => {
  const dispatch = useDispatch();

  //to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token, user.email)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoutes exact path="/user/History" component={History} />
        <UserRoutes exact path="/user/password" component={Password} />
        <UserRoutes exact path="/user/wishlist" component={Wishlist} />
        <AdminRoutes exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoutes exact path="/admin/category" component={CategoryCreate} />
        <AdminRoutes
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoutes exact path="/admin/sub" component={SubCreate} />
        <AdminRoutes exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoutes exact path="/admin/product" component={ProductCreate} />
        <AdminRoutes exact path="/admin/products" component={AllProducts} />
        <AdminRoutes
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
      </Switch>
    </>
  );
};

export default App;
