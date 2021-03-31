import React from 'react';
import { Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Home from "./pages/Home"

const App = () => {
  return (
    <switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Register" component={Register} />
    </switch>

  );
}

export default App;
