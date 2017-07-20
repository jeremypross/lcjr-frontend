import React, { Component } from "react";
import { browserHistory, Link } from "react-router";
import update from "react-addons-update";

import Nav from "../Nav/Nav";


class PostShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {}
    }
  }

  componentWillMount() {
    fetch(`http://localhost:3000/posts/${this.props.params.id}`, {
      method: "GET"
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ post: data })
        console.log("componentDidMount() data", this.state.post.post);
      })
    })
    .catch((err) => {
      console.log("ERROR", err);
    })
  }

  render() {
    return(
      <div key={this.props.id}>
        <Nav />
        <div className="show-container">
          <h3>{this.state.post.post.title}</h3>
          <img src={this.state.post.post.image_url} width="200px"/>
          <p>{this.state.post.post.post_text}</p>
          <p><a href={this.state.post.post.source_url}>Source URL</a></p>
          <p><span className="category-icon">{this.state.post.post.category}</span></p>
        </div>
      </div>
    );
  }
}

export default PostShow;
