import React, { Component } from "react";
import update from "react-addons-update";
import Nav from "../Nav/Nav";


class Login extends Component {
  constructor(props) {
    super(props);

    this.state={
      user: {
        email: "",
        password: ""
      }
    };
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

  // POST request
  handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then((results) => {
      results.json().then((jwt) => {
        // store token and user ID in browser cache
        window.localStorage.setItem("MyToken", jwt.token.token);
        window.localStorage.setItem("user_id", jwt.token.user_id);
        window.localStorage.setItem("loggedin", jwt.token.loggedIn)
        // push to user's dashboard
        this.props.router.push("/dashboard");
      });
    })
    .catch(() => {
      alert("Not Authenticated!");
    });
  }

  render() {
    return (
      <div>
        <div id="login-form">
          <div className="container">
            <h1>LOG IN</h1>
            <Nav />
            <div className="form-container">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input name="email" type="email" placeholder="email" onChange={this.handleChange.bind(this)} />
                <br/>
                <input name="password" type="password" placeholder="password" onChange={this.handleChange.bind(this)} />
                <br/>
                <br/>
                <button className="login-button" type="submit">Log In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
