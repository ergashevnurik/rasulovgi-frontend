import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Navbar from '../components/navbar/navbar';
import Sidebar from "./sidebar";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <section className="profile-section">
        <div className="">
          <div className="row m-0 p-0">
            <div className="col-md-2 m-0 p-0">
              <Sidebar />
            </div>
            <div className="col-md-10 m-0 p-0">
              <Navbar />
              <div className="container">
                {(this.state.userReady) ?
                  <div>
                  <header className="jumbotron">
                    <h3>
                      <strong>{currentUser.username}</strong> Profile
                    </h3>
                  </header>
                  <p>
                    <strong>Token:</strong>{" "}
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                  </p>
                  <p>
                    <strong>Id:</strong>{" "}
                    {currentUser.id}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {currentUser.email}
                  </p>
                  <strong>Authorities:</strong>
                  <ul>
                    {currentUser.roles &&
                      currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                  </ul>
                </div>: null}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
