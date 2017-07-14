import React, { Component } from "react";
import update from "react-addons-update";
import { browserHistory } from "react-router";

import UserNav from "../Nav/UserNav";

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      id: 0
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
  }

  componentDidMount() {
    fetch(`http://localhost:3000/posts/${this.state.id}/edit`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.post.title
      })
    })
    .then(() => {
      this.setState({ post: this.state.post });
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
  }

  // editPost() {
  //
  // }

  render() {
    return(
      <div id="main-page">
        <UserNav />
        <h3>Edit Post:</h3>
        <div className="form-container">
          <form>
            <input name="title" onChange={this.handleChange.bind(this)}></input>
          </form>
        </div>

      </div>
    );
  }
}

export default EditPost;
