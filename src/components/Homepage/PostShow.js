import React, { Component } from "react";
import { browserHistory, Link } from "react-router";
import update from "react-addons-update";

class PostShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {}
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/posts/${this.props.id}`, {
      method: "GET"
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ post: data })
        console.log("componentDidMount() data", this.state.post);
      })
    })
    .catch((err) => {
      console.log("ERROR", err);
    })
  }

  render() {
    return(
      <div key={this.props.id}>
        <p>{this.props.post_text}</p>
        <p><a href={this.props.source_url}>Source</a></p>
        <button type="submit" onClick={this.props.showLess}>&times;</button>
      </div>
    );
  }
}

export default PostShow;
