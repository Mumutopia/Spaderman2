import React, { Component } from "react";
import { Link,Navigate } from "react-router-dom";
// custom tools
import APIHandler from "../api/APIHandler";

import { withAuth } from "./../auth/UserContext";
import "../styles/signup.css"
// styles



class Signup extends Component {
  state = {
    
    username: "admin",
    email: "admin@foobarbaz.io",
    password: "12345",
  };


  handleSubmit = async (e) => {
    e.preventDefault();

    // const fd = new FormData();
    // // create a form data (programatic form, to send the file as binary)
    // fd.append("email", this.state.email);
    // fd.append("password", this.state.password);
    // fd.append("username", this.state.username);
    

    try {
      await APIHandler.post("/signup", this.state);
      this.props.history.push("/signin");
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

//   handleImage = (e) => {
//     // console.log("Signup@handle image", e.target.files[0]);
//     this.setState({ avatar: e.target.files[0] }, () => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         // when the fileREader ends  ...
//         const baseString = reader.result; // get the image as a base64 encoded string
//         this.setState({ tmpAvatar: baseString }); // set the tmp avatar as an image source before upload
//       };
//       reader.readAsDataURL(this.state.avatar); // read the file from the local disk
//     });
//   };

  render() {
    console.log(this.props);
    const { isLoggedIn } = this.props.userContext;
    const { email, password, username} = this.state;
    return isLoggedIn ? (
      // avoid the component to be rendered if user is already logged in
    //   <Redirect to="/dashboard" />
    <Navigate to="/home" />
    ) : (
      <div className="signup-wrapper" >
      <div className="index-header">
        <img className="index-header-images" src="./img/R2.png" alt="icon" />
        <img className="index-header-images" src="./img/Gr2.png" alt="icon" />
        <div className="index-titles">
          <h1 className="index-title">Spaderman</h1>
          <h2>Coding From Home</h2>
        </div>

        <img className="index-header-images" src="./img/Br2.png" alt="icon" />
        <img className="index-header-images" src="./img/bomb2.png" alt="icon" />
      </div>
      <img
          className="index-grid1 image-title"
          src="./img/blue-shovel4.png"
          alt="avatar"
        />
        <form
        className="signup-form"
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      >
        <h1 className="title">Signup</h1>
        <label className="label" htmlFor="email">
          email
        </label>
        <input
          className="input"
          id="email"
          type="email"
          name="email"
          defaultValue={email}
        />
        <label className="label" htmlFor="username">
          username
        </label>
        <input
          className="input"
          id="username"
          type="text"
          name="username"
          defaultValue={username}
        />
        
        <label className="label" htmlFor="password">
          password
        </label>
        <input
          className="input"
          id="password"
          type="password"
          name="password"
          defaultValue={password}
        />
        <button className="btn">ok</button>
        <p className="parag">
          Already a member ? please{" "}
          <Link to="/signin" className="link">
            signin
          </Link>
        </p>
      </form>
      <img
        className="index-grid3 image-title"
        src="./img/red-shovel4.png"
        alt="avatar"
      />
      </div>
      
    );
  }
}

export default withAuth(Signup);
