import React, { Component } from "react";
import update from "react-addons-update";
import Nav from "../Nav/Nav";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      source: {
        query: ''
      }
    };
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
      fetch(`http://localhost:3000/articles`, {
        method: "POST",
        body: JSON.stringify({
          article: {
            author: `${this.state.article.author}`,
            title: `${this.state.article.title}`,
            description: `${this.state.article.description}`,
            url: `${this.state.article.url}`,
            urlToImage: `${this.state.article.urlToImage}`,
            published: `${this.state.article.published}`,
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
    return (
      <div id="main-page">
          <h1>LC / JR Project</h1>
          <Nav />


      </div>
    );
  }
}

export default Homepage;
