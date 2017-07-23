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
        this.setState({ post: data.post })
        console.log("componentDidMount() data", this.state.post);
      })
    })
    .catch((err) => {
      console.log("ERROR", err);
    })
  }

  render() {
    return(
      <div key={this.props.params.id}>
        <Nav />
        <div className="show-container">
          <div className="link-to-home">
            <Link className="link-home" to="/">&#x021A9;</Link>
          </div>
          <h2>{this.state.post.title}</h2>
          <img src={this.state.post.image_url} height="260px"/>
          <p>{this.state.post.post_text}</p>
          <p><a href={this.state.post.source_url}>Source URL</a></p>
          <p><span className="category-icon">{this.state.post.category}</span></p>
        </div>
      </div>
    );
  }
}

export default PostShow;
