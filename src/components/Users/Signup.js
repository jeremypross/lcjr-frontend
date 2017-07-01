import React, { Component } from "react";
import { browserHistory } from "react-router";
import update from "react-addons-update";

import Nav from "../Nav/Nav";

class SignUp extends Component {
  constructor(props) {
    super(props);

    // state is empty user object
    this.state = {
      user: {}
    };
  }

  // GET request for user data
  componentDidMount() {
    fetch(`http://localhost:3000/users`, {
      method: "GET"
    })
    .then((results) => {
      results.json().then((data) => {
        user: data;
        console.log("signup.js componentDidMount data:", data);
      });
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
  }

  handleChange(event) {
    let newState = update(this.state, {
      user: {
        $merge: {
          [event.target.name]: event.target.value
        }
      }
    });

    this.setState(newState);
  }

  // POST request to server for user signup
  handleSubmit(event) {
    event.preventDefault();

    console.log(this.state);

    fetch(`http://localhost:3000/users`, {
      method: "POST",
      body: JSON.stringify(this.state.user),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      // after signup - send user to login page
      browserHistory.push("/login");
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
  }

  render(){
    return(
      <div id="signup-form">
        <div className="container">
          <div className="form-container">
            <h1>CREATE AN ACCOUNT</h1>
            <Nav />
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input name="first_name" type="text" placeholder="First Name" onChange={this.handleChange.bind(this)} /><br/>
              <input name="last_name" type="text" placeholder="Last Name" onChange={this.handleChange.bind(this)} /><br/>
              <input name="email" type="email" placeholder="Email Address" onChange={this.handleChange.bind(this)} /><br/>
              <input name="password_digest" type="password" placeholder="Password" onChange={this.handleChange.bind(this)} /><br/>
              <br />
              <br />
              <button className="standard-btn" type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
