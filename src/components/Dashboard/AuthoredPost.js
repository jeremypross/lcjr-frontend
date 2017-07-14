import React, { Component } from "react";
import { Link } from "react-router";
import update from "react-addons-update";

class AuthoredPost extends Component {
  constructor() {
    super();

    this.state = {
      isVisible: {
        display: "block"
      }
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

  // componentDidMount() {
  //   fetch(`http://localhost:3000/users/${this.state.user_id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(this.state)
  //   })
  //   .the((results) => {
  //     results.json().then((data) => {
  //       this.setState({ posts: data.data });
  //     })
  //   })
  //   .catch((err) => {
  //     console.log("ERROR:", err);
  //   })
  // }

  editPost(event) {
    const user_id = window.localStorage.getItem('user_id');
    fetch(`http://localhost:3000/posts/${this.props.id}/${this.props.user_id}`, {
      method: "PUT",
      body: JSON.stringify({ }),
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
      <div style={this.state.isVisible}>
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
