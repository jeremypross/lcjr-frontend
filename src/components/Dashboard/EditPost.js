import React, { Component } from "react";
import update from "react-addons-update";
import { browserHistory } from "react-router";

import UserNav from "../Nav/UserNav";

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      id: 26
    }
  }

  handleChange(event) {
    let newState = update(this.state, {
      post: {
        $merge: {
          [event.target.name]: event.target.value
        }
      }
    });

    this.setState(newState);
    console.log("NEW STATE after handle change", this.state.post)
  }

  componentDidMount() {
    fetch(`http://localhost:3000/posts/${this.state.id}/edit`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ post: data.post });
        this.setState({ id: data.post.id })
        console.log("THIS.STATE.POST", this.state.post)
      })
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
  }

  editPost(event) {
    const user_id = window.localStorage.getItem('user_id');
    fetch(`http://localhost:3000/posts/${this.state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        post: {
          title: this.state.post.title,
          image_url: this.state.post.image_url,
          source_url: this.state.post.source_url,
          category: this.state.post.category,
          user_id: user_id
        }
      })
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ post: data });
        console.log("EDIT POST data in PROMISE", data);
      })
    })
    .catch((err) => {
      console.log("ERROR", err);
    })
  }

  render() {
    return(
      <div id="main-page">
        <UserNav />
        <h3>Edit Post:</h3>
        <div className="form-container">
          <form onSubmit={this.editPost.bind(this)}>
            <p>Title</p>
            <input name="title" value={this.state.post.title} onChange={this.handleChange.bind(this)}></input><br />
            <p>Source URL</p>
            <input name="source_url" value={this.state.post.source_url} onChange={this.handleChange.bind(this)}></input><br />
            <p>Image URL</p>
            <input name="image_url" value={this.state.post.image_url} onChange={this.handleChange.bind(this)}></input><br />
            <p>Category</p>
            <input name="category" value={this.state.post.category} onChange={this.handleChange.bind(this)}></input><br />
            <button type="submit">Edit Post</button>
          </form>
        </div>

      </div>
    );
  }
}

export default EditPost;
