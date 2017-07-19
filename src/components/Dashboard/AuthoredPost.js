import React, { Component } from "react";
import { Link } from "react-router";
import update from "react-addons-update";

class AuthoredPost extends Component {
  constructor() {
    super();

    this.state = {
      isVisible: {
        display: "block"
      },
      post: {}
    };
  }

  handleChange(event) {
    let newState = update(this.state, {
      $merge: {
        [event.target.name]: event.target.value
      }
    });

    this.setState(newState);
  }

  handleDelete() {
    fetch(`http://localhost:3000/posts/${this.props.id}/${this.props.user_id}`, {
      method: "DELETE"
    })
    .then(() => {
      this.setState({ isVisible: { display: "none"}});
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
  }

  render() {
    return(
      <div key={this.props.id} style={this.state.isVisible}>
        <div className="authored_posts">
          <h3>{this.props.title}</h3>
          <img src={this.props.image_url} width="90%" />
          <p>{this.props.post_text}</p>
          <p>Source: <a href={this.props.source_url}>{this.props.source_url}</a></p>
          <p>Category: {this.props.category}</p>
          <Link to="/dashboard">
            <button onClick={this.handleDelete.bind(this)}>Delete Post</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default AuthoredPost;
