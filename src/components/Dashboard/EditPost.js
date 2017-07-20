import React, { Component } from "react";
import update from "react-addons-update";
import { withRouter, browserHistory } from "react-router";

import UserNav from "../Nav/UserNav";

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      isVisible: {
        display: "block"
      },
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

  componentWillMount() {
    fetch(`http://localhost:3000/posts/${this.props.params.id}/edit`, {
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
    event.preventDefault();
    const user_id = window.localStorage.getItem('user_id');
    fetch(`http://localhost:3000/posts/${this.props.params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        post: {
          title: this.state.post.title,
          post_text: this.state.post.post_text,
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
        console.log("EDIT POST data in PROMISE", this.state.post);
        browserHistory.push('/dashboard');
      })
    })
    .catch((err) => {
      console.log("ERROR", err);
    })
  }

  render() {
    return(
      <div id="main-page">
        <div className="form-container" id="edit-post-form" style={this.state.isVisible}>
          <form onSubmit={this.editPost.bind(this)}>
            <h3>Edit Post</h3>
            <label>Title:
              <br />
              <input name="title" value={this.state.post.title} onChange={this.handleChange.bind(this)}></input><br />
            </label>
            <label>Post Text:
              <br />
              <textarea name="post_text" value={this.state.post.post_text} onChange={this.handleChange.bind(this)}></textarea><br />
            </label>
            <label>Source URL:
              <br />
              <input name="source_url" value={this.state.post.source_url} onChange={this.handleChange.bind(this)}></input><br />
            </label>
            <label>Image URL:
              <br />
              <input name="image_url" value={this.state.post.image_url} onChange={this.handleChange.bind(this)}></input><br />
            </label>
            <label>Category:
              <br />
              {/* <input name="category" value={this.state.post.category} onChange={this.handleChange.bind(this)}></input><br /> */}
              <select name="category" value={this.state.post.category} type="text" placeholder="Category" onChange={this.handleChange.bind(this)} placeholder="Category" >
                <option value="">Category:</option>
                <option value="&#x02A53;">Art</option>
                <option value="	&#8962;">Architecture & Design</option>
                <option value="	&#128085;">Fashion</option>
                <option value="&#127859;">Food</option>
                <option value="&#9836;">Music</option>
                <option value="&#128240;">News</option>
              </select>
            </label>
            <br />
            <br />
            <button type="submit" value="submit">Edit Post</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditPost;
