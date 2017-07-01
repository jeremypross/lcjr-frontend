import React, { Component } from "react";
import update from "react-addons-update";
import Nav from "../Nav/Nav";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }


  render() {
    return (
      <div id="main-page">
          <h1>LC / JR Project</h1>
          <Nav />

      </div>
    );
  }
}

export default Homepage;
