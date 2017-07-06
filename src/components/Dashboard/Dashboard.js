import React, { Component } from "react";
import update from "react-addons-update";
import { browserHistory } from "react-router";

import UserNav from "../Nav/UserNav";
import AuthoredPost from "../Dashboard/AuthoredPost";

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
    fetch(`http://localhost:3000/posts/${this.state.user_id}`, {
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
          this.props.router.push('/dashboard');
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
        <div className="form-container">
          <h3>Add Post:</h3>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input name="title" type="text" placeholder="Title" onChange={this.handleChange.bind(this)}></input><br/>
            <input name="image_url" type="text" placeholder="Image URL" onChange={this.handleChange.bind(this)}></input><br/>
            <input name="source_url" type="text" placeholder="Source URL" onChange={this.handleChange.bind(this)}></input><br/>
            <input name="category" type="text" placeholder="Category" onChange={this.handleChange.bind(this)}></input><br/>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          {this.state.posts.map((post) => {
            return(
              <div key={post.id}>
                <AuthoredPost
                  title={post.title}
                  image_url={post.image_url}
                  source_url={post.source_url}
                  image_url={post.image_url}
                  category={post.category}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dashboard;
