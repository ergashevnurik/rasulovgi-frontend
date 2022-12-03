import React, { Component } from "react";
import UserDataService from "./services/user.service";
import AuthService from "../../services/auth.service";
import { Navigate } from "react-router-dom";
import Navbar from '../../components/navbar/navbar';
import Sidebar from "../../components/sidebar/index";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);

    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      username: "",
      password: "",
      firstName: '',
      lastName: '',
      email: "",
      age: 0,
      address: '',
      phoneNumber: '',
      active: false,

      submitted: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }

  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value
    });
  }

  saveUser() {
    var data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          active: response.data.active,
          age: response.data.age,
          phoneNumber: response.data.phoneNumber,
          address: response.data.address,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      active: false,
      age: 0,
      address: '',
      phoneNumber: '',

      submitted: false
    });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <section className="user-list-section">
        <div className="">
          <div className="row m-0 p-0">
            <div className="col-md-2 aside-container-panel m-0 p-0">
              <Sidebar />
            </div>
            <div className="col-md-9 m-0 p-0">
              <Navbar />
              <div className="container p-3">
                <div className="submit-form">
                  {this.state.submitted ? (
                    <div>
                      <h4>You submitted successfully!</h4>
                      <button className="btn btn-success" onClick={this.newUser}>
                        Add
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          required
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                          name="username"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          required
                          value={this.state.firstName}
                          onChange={this.onChangeFirstName}
                          name="firstName"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          required
                          value={this.state.lastName}
                          onChange={this.onChangeLastName}
                          name="lastName"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                          required
                          value={this.state.phoneNumber}
                          onChange={this.onChangePhoneNumber}
                          name="phoneNumber"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          required
                          value={this.state.address}
                          onChange={this.onChangeAddress}
                          name="address"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                          type="text"
                          className="form-control"
                          id="age"
                          required
                          value={this.state.age}
                          onChange={this.onChangeAge}
                          name="age"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="text"
                          className="form-control"
                          id="password"
                          required
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          name="password"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          required
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          name="email"
                        />
                      </div>

                      <button onClick={this.saveUser} className="btn btn-success">
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
