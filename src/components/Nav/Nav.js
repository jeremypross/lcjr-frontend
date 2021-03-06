import React, { Component } from "react";
import { Link } from "react-router";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: {
        display: 'none'
      },
      loggedOut: {
        display: 'inline-block'
      },
      logged: "false"
    };
  }

  // componentDidMount() {
  //   if(window.localStorage.getItem('loggedin')) {
  //     this.setState({loggedOut: {display: 'none'}});
  //     this.setState({loggedIn: {display: 'inline-block'}});
  //     this.setState({logged: true });
  //   } else {
  //     this.setState({loggedIn: {display: 'none'}});
  //     this.setState({loggedOut:{display: 'inline-block'}});
  //   }
  // }

  render() {
    return (
      <div id="nav">
        <h1><a id="homepage-link" href="/">LCJR</a></h1>
        <ul id="nav-bar">
          <li>
            <Link className="nav-link" to="/login">LOG IN</Link>
          </li>
          <li>
            <Link className="nav-link" to="/contact">CONTACT</Link>
          </li>


        </ul>
      </div>
    );
  }
}

export default Nav;
