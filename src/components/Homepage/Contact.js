import React, { Component } from "react";
import update from "react-addons-update";
import { browserHistory, Link } from "react-router";

import Nav from "../Nav/Nav";

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      comment: "",
      link: "",

    }
  }

  handleChange(event) {
    let newState = update(this.state, {
      $merge: {
        [event.target.name]: event.target.value
      }
    });

    this.setState(newState);
    console.log("handleChange()", newState);
  }

  handleSubmit() {

  }

  render() {
    return(
      <div>
        <Nav />
        <div className="container">
          <h3></h3>
          <div className="form-container">
            <form id="contact-form" action="mailto:jeremypross@gmail.com" method="post" type="text/plain">
              <label>Name:
                <br />
                <input name="name" value={this.state.name} onChange={this.handleChange.bind(this)}></input><br />
              </label>
              <label>Email:
                <br />
                <input name="email" value={this.state.email} onChange={this.handleChange.bind(this)}></input><br />
              </label>
              <label>Comment:
                <br />
                <textarea name="comment" value={this.state.comment} onChange={this.handleChange.bind(this)}></textarea><br />
              </label>
              <label>URL:
                <br />
                <input name="url" value={this.state.url} onChange={this.handleChange.bind(this)}></input><br />
              </label>
              <button type="submit">Submit Form</button>
            </form>
          </div>
        </div>
      </div>
    )
  }


}

export default Contact;
