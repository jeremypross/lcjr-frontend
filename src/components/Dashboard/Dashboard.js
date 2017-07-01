import React, { Component } from "react";
import { browserHistory } from "react-router";

import Nav from "../Nav/Nav";


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      user_id: 0,
      post: {}
    };
  }

  // checks for Token in localStorage - if no token push user to dashboard
  componentWillMount() {
    if (!localStorage.getItem('MyToken')) {
      browserHistory.push('/login');
    }
  }

  // GET request to authorize token for dashboard access and find all users's saved recipes
  componentDidMount() {
    fetch('http://localhost:3000/users/dashboard', {
      method: "GET",
      headers: {
        "Authorization": window.localStorage.getItem("MyToken")
      }
    })
    .then((results) => {
      results.json().then((data) => {
        // this.setState({ articles: data.data });
        this.setState({ user_id: data.user_id });
        window.localStorage.setItem('user_id', this.state.user_id);
      });
    })
    .catch((err) => {
      console.log("ERROR:", err);
      browserHistory.push('/login');
    });
  }

  render() {
    return(
      <div id="dashboard">

        <h3>Admin</h3>
        <Nav />

      </div>
    );
  }
}

export default Dashboard;
