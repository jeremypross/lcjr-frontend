import React, { Component } from "react";
import { Link } from "react-router";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // loggedIn: {
      //   display: 'none'
      // },
      // loggedOut: {
      //   display: 'inline-block'
      // }
    };
  }

  // componentDidMount() {
  //   if(window.localStorage.getItem('loggedin')) {
  //     this.setState({loggedOut: {display: 'none'}});
  //     this.setState({loggedIn: {display: 'inline-block'}});
  //   } else {
  //     this.setState({loggedIn: {display: 'none'}});
  //     this.setState({loggedOut:{display: 'inline-block'}});
  //   }
  // }

  render() {
    return (
      <div id="nav">
        <h1>(LC & JR Project)</h1>
        <ul id="nav-bar">
          <li>
            <Link className="nav-link" to="/">HOME</Link>
          </li>
          <li>
            <Link className="nav-link" to="/signup">SIGN UP</Link>
          </li>
          <li>
            <Link className="nav-link" to="/login">LOG IN</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
