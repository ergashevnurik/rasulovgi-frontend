import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import { withRouter } from '../common/with-router';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
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

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <section className="auth-section">
        <div>
          <div className="row m-0 p-0">
            <div className="col-md-6 m-0 p-0 w-100 form-container">
              <div className="card card-container w-100">
                <Form
                  onSubmit={this.handleLogin}
                  ref={c => {
                    this.form = c;
                  }}
                >
                  <div className="text-wrapper">
                    <h1>Sign in</h1>
                    <p>Please sign in by using your credentials</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required]}
                    />
                  </div>

                  <div className="form-group d-flex justify-content-between align-items-center">
                    <div className="">
                      <input type="checkbox" /> Keep logged in?
                    </div>
                    <a href="/forgot" className="btn text-right no-focus">Forgot Password?</a> 
                  </div>

                  <div className="form-group">
                    <button
                      className="btn btn-styled btn-block"
                      disabled={this.state.loading}
                    >
                      {this.state.loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Sign in</span>
                    </button>
                  </div>

                  {this.state.message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {this.state.message}
                      </div>
                    </div>
                  )}
                  <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                      this.checkBtn = c;
                    }}
                  />
                </Form>
              </div>
            </div>
            <div className="col-md-6 m-0 p-0">
              <div className="sign-in-auth-bg">
                <div className="logo"></div>
              </div>
            </div> 
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Login);