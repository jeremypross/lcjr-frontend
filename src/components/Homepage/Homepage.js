import React, { Component } from "react";
// import update from "react-addons-update";
import { Link } from "react-router";

import Nav from "../Nav/Nav";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentWillMount() {
    fetch('http://localhost:3000/posts', {
      method: "GET"
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ posts: data });
        console.log("HOMEPAGE COMPONENT DID MOUNT GET", data);
      });
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
  }

  findMusicPosts() {
    fetch('http://localhost:3000/posts/music', {
      method: "GET"
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ posts: data });
        console.log("MUSIC POSTS", data)
      });
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
  }

  findArtPosts() {
    fetch('http://localhost:3000/posts/art', {
      method: "GET"
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ posts: data });
        console.log("ART POSTS", data)
      });
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
  }

  findNewsPosts() {
    fetch('http://localhost:3000/posts/news', {
      method: "GET"
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ posts: data });
        console.log("NEWS POSTS", data)
      });
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
  }

  findStylePosts() {
    fetch('http://localhost:3000/posts/style', {
      method: "GET"
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ posts: data });
        console.log("STYLE POSTS", data)
      });
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
  }

  findDesignPosts() {
    fetch('http://localhost:3000/posts/design', {
      method: "GET"
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ posts: data });
        console.log("DESIGN POSTS", data)
      });
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
  }

  findFoodPosts() {
    fetch('http://localhost:3000/posts/food', {
      method: "GET"
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ posts: data });
        console.log("FOOD POSTS", data)
      });
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
  }


  render() {
    return(
      <div id="main-page">
          <Nav />
          <h2></h2>
          <div className="category-nav">
            <button className="category-button" onClick={this.findArtPosts.bind(this)}>ART</button>
            <button className="category-button" onClick={this.findDesignPosts.bind(this)}>DESIGN</button>
            <button className="category-button" onClick={this.findFoodPosts.bind(this)}>FOOD</button>
            <button className="category-button" onClick={this.findMusicPosts.bind(this)}>MUSIC</button>
            <button className="category-button" onClick={this.findNewsPosts.bind(this)}>NEWS</button>
            <button className="category-button" onClick={this.findStylePosts.bind(this)}>STYLE</button>
          </div>
          <div className="blog-roll">
            {this.state.posts.map((post) => {
              return(
                <div key={post.id} className="post">
                  <Link to={`/${post.id}`}>
                    <h3>{post.title}</h3>
                  </Link>
                  <Link to={`/${post.id}`}>
                  <img src={post.image_url} height="200px"/>
                  </Link>
                  <p>
                    <span className="category-icon">{post.category}</span>
                  </p>
                </div>
              );
            })}
          </div>

      </div>
    );
  }
}

export default Homepage;
