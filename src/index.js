import React from "react";
import ReactDom from "react-dom";
import { Route, Router, browserHistory } from "react-router";

import "./styles/normalize.css";
import "./styles/style.css";

import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import Signup from "./components/Users/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import SavedPost from "./components/Dashboard/AuthoredPost";
import EditPost from "./components/Dashboard/EditPost";

ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/:id/edit" component={EditPost} />
  </Router>
  , document.getElementById("app")
);
