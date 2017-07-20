import React, { Component } from "react";
import update from "react-addons-update";
import { browserHistory, Link } from "react-router";

import Nav from "../Nav/Nav";

import PostShow from "../Homepage/PostShow";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/posts', {
      method: "GET"
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ posts: data })
        console.log("HOMEPAGE COMPONENT DID MOUNT GET", data);
      });
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
  }


  render() {
    return(
      <div id="main-page">
          <Nav />
          <h2></h2>
          <div className="blog-roll">
            {this.state.posts.map((post) => {
              return(
                <div key={post.id} className="post">
                  <Link to={`/${post.id}`}>
                  <h3>{post.title}</h3>
                  </Link>
                  <img src={post.image_url} width="100%"/>
                  <p><span className="category-icon">{post.category}</span></p>
                </div>
              )
            })}
          </div>
      </div>
    );
  }
}

export default Homepage;
