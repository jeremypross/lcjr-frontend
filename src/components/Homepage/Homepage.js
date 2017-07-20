import React, { Component } from "react";
import update from "react-addons-update";
import Nav from "../Nav/Nav";

import PostShow from "../Homepage/PostShow";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isVisible: false,
      buttonVisible: true
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

  showMore() {
    this.setState({ isVisible: true })
    this.setState({ buttonVisible: false })
  }

  showLess() {
    this.setState({ isVisible: false })
    this.setState({ buttonVisible: true })
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
                  <h3>{post.title}</h3>
                  <img src={post.image_url} width="100%"/>

                  {this.state.isVisible ?
                    <PostShow
                      id={post.id}
                      title={post.title}
                      post_text={post.post_text}
                      source_url={post.source_url}
                      image_url={post.image_url}
                      category={post.category}
                      showLess={this.showLess.bind(this)}
                    /> : null}

                  <p><span className="category-icon">{post.category}</span></p>

                  {this.state.buttonVisible ?
                    <button type="submit" onClick={this.showMore.bind(this)}> More:</button>
                  : null}

                </div>
              )
            })}
          </div>
      </div>
    );
  }
}

export default Homepage;
