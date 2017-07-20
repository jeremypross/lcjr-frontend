import React, { Component } from "react";
import update from "react-addons-update";
import { browserHistory } from "react-router";

import UserNav from "../Nav/UserNav";
import AuthoredPost from "../Dashboard/AuthoredPost";
import EditPost from "../Dashboard/EditPost";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      user_id: 0,
      post: {}
    };
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

  // checks for Token in localStorage - if no token push user to dashboard
  componentWillMount() {
    if (!localStorage.getItem('MyToken')) {
      browserHistory.push('/login');
    } else {
      this.setState({ user_id: window.localStorage.getItem('user_id')})
    }
  }

  // GET request to authorize token for dashboard access and find all users's saved recipes
  componentDidMount() {
    fetch(`http://localhost:3000/users/${this.state.user_id}/dashboard`, {
      method: "GET",
      headers: {
        "Authorization": window.localStorage.getItem("MyToken")
      }
    })
    .then((results) => {
      results.json().then((data) => {
        // this.setState({ user_id: window.localStorage.getItem('user_id') });
        this.setState({ posts: data.posts }); // NEW LINE
        console.log("DATA", this.state.posts);
        console.log("AUTHORED POSTS USER ID", this.state.user_id)
        // window.localStorage.setItem('user_id', this.state.user_id);
      });
    })
    .catch((err) => {
      console.log("ERROR:", err);
      browserHistory.push('/login');
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // check if user is logged in to see if they can save recipes
    // if not user is pushed to login page
    if(window.localStorage.getItem('loggedin')) {
      fetch(`http://localhost:3000/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          post: {
            title: `${this.state.post.title}`,
            post_text: `${this.state.post.post_text}`,
            image_url: `${this.state.post.image_url}`,
            source_url: `${this.state.post.source_url}`,
            category: `${this.state.post.category}`,
            user_id: window.localStorage.getItem('user_id')
          }
        }),
      })
      .then((results) => {
        results.json().then((data) => {
          this.setState({ post: data})
          console.log("DATA", data)
          // push to dashboard
          this.props.router.push('/');
        });
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
    // if user isn't logged in and tries to save article - send to login page
    } else {
      this.props.router.push('/login');
    }
  }

  render() {
    return(
      <div id="main-page">
        <UserNav />
        <h3></h3>
        <div className="form-container" id="add-post-form">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h3>Add Post</h3>
            <input name="title" type="text" placeholder="Title" onChange={this.handleChange.bind(this)}></input><br/>
            <textarea name="post_text" type="text" placeholder="Post Text" onChange={this.handleChange.bind(this)}></textarea><br/>
            <input name="image_url" type="text" placeholder="Image URL" onChange={this.handleChange.bind(this)}></input><br/>
            <input name="source_url" type="text" placeholder="Source URL" onChange={this.handleChange.bind(this)}></input><br/>
            <select name="category" type="text" placeholder="Category" onChange={this.handleChange.bind(this)} placeholder="Category" >
              <option value="">Category:</option>
              <option value="&#x02A53;">Art</option>
              <option value="	&#8962;">Architecture & Design</option>
              <option value="	&#128085;">Fashion</option>
              <option value="&#127859;">Food</option>
              <option value="&#9836;">Music</option>
              <option value="&#128240;">News</option>
            </select>
            <br />
            <br />
            <button type="submit">Add Post</button>
          </form>
        </div>
        <div>
          {this.state.posts.map((post) => {
            return(
              <div key={post.id} className="dashboard-container">
                <div className="dashboard-item">
                  <AuthoredPost
                    title={post.title}
                    post_text={post.post_text}
                    image_url={post.image_url}
                    source_url={post.source_url}
                    image_url={post.image_url}
                    category={post.category}
                    id={post.id}
                    user_id={post.user_id}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dashboard;
