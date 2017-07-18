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

  editPost(event) {
    const user_id = window.localStorage.getItem('user_id');
    fetch(`http://localhost:3000/posts/${this.props.id}/${this.props.user_id}`, {
      method: "PUT",
      body: JSON.stringify({
        post: {
          title: this.state.post.title,
          image_url: this.state.post.image_url,
          source_url: this.state.post.source_url,
          category: this.state.post.category,
          user_id: user_id
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      this.setState({ post: this.state.post });
    })
    .catch((err) => {
      console.log("ERROR", err);
    })
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
          <img src={this.props.image_url} width="300" />
          <p>Source: <a href={this.props.source_url}>{this.props.source_url}</a></p>
          <p>Category: {this.props.category}</p>
          <Link to="/dashboard/edit">
            <button>Edit Post</button>
          </Link>
          <Link to="/dashboard">
            <button onClick={this.handleDelete.bind(this)}>Delete Post</button>
          </Link>
        </div>
      </div>
    );
  }

}

export default AuthoredPost;
