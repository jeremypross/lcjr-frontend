import React, { Component } from "react";
import { browserHistory } from "react-router";

import UserNav from "../Nav/UserNav";


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      user_id: 0,
      post: {}
    };
  }

  // checks for Token in localStorage - if no token push user to dashboard
  componentWillMount() {
    if (!localStorage.getItem('MyToken')) {
      browserHistory.push('/login');
    }
  }

  // GET request to authorize token for dashboard access and find all users's saved recipes
  componentDidMount() {
    fetch('http://localhost:3000/users/dashboard', {
      method: "GET",
      headers: {
        "Authorization": window.localStorage.getItem("MyToken")
      }
    })
    .then((results) => {
      results.json().then((data) => {
        // this.setState({ articles: data.data });
        this.setState({ user_id: data.user_id });
        window.localStorage.setItem('user_id', this.state.user_id);
      });
    })
    .catch((err) => {
      console.log("ERROR:", err);
      browserHistory.push('/login');
    });
  }

  handleChange(event) {
    let newState = update(this.state, {
      source: {
        $merge: {
          [event.target.name]: event.target.value
        }
      }
    });

    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    // check if user is logged in to see if they can save recipes
    // if not user is pushed to login page
    if(window.localStorage.getItem('loggedin')) {
      fetch(`http://localhost:3000/posts`, {
        method: "POST",
        body: JSON.stringify({
          post: {
            title: `${this.state.post.title}`,
            image_url: `${this.state.post.image_url}`,
            source_url: `${this.state.post.source_url}`,
            category: `${this.state.post.category}`,
            user_id: window.localStorage.getItem('user_id')
          }
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        // push to dashboard
        this.props.router.push('/dashboard');
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
      <div id="dashboard">
        <UserNav />
        <div className="form-container">
          <form>
            <h3>Add Post:</h3>
            <input name="title" value={this.state.post.title} placeholder="title" onChange={this.handleChange.bind(this)}></input><br/>
            <input name="image_url" value={this.state.post.image_url} placeholder="Image URL" onChange={this.handleChange.bind(this)}></input><br/>
            <input name="source_url" placeholder="Source URL" onChange={this.handleChange.bind(this)}></input><br/>
            <input name="category" placeholder="Category" onChange={this.handleChange.bind(this)}></input><br/>
            <input type="submit" value="Submit" onClick={this.handleSubmit.bind(this)}></input>
          </form>
        </div>



      </div>
    );
  }
}

export default Dashboard;
