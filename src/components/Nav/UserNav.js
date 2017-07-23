import React, { Component } from "react";
import { Link, browserHistory } from "react-router";

class UserNav extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {
    window.localStorage.removeItem("MyToken");
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("loggedin");
    browserHistory.push('/');
  }

  render() {
    return (
      <div id="nav">
        <ul id="nav-bar">
          <h1><a id="homepage-link" href="/">Admin Dashboard</a></h1>
          <li>
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li>
            <Link className="nav-link" to="/" onClick={this.handleSubmit.bind(this)}>Logout</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default UserNav;
