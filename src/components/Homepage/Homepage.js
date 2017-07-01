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
    return (
      <div id="main-page">
          <Nav />
          <h2>Posts:</h2>
          <div>
            {this.state.posts.map((post) => {
              return(
                <div key={post.id} className="post">
                  <h3>{post.title}</h3>
                  <img src={post.image_url} width="200"/>
                  <p>Source: <a href={post.source_url}>{post.source_url}</a><br/></p>
                  <p>Category: {post.category}</p>
                </div>
              )
            })}

          </div>

      </div>
    );
  }
}

export default Homepage;
