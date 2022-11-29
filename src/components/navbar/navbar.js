import React, { Component } from 'react'
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    
        this.state = {
          showModeratorBoard: false,
          showAdminBoard: false,
          currentUser: undefined,
        };
      }
    
      componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user,
            showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
            showAdminBoard: user.roles.includes("ROLE_ADMIN"),
          });
        }
        
        EventBus.on("logout", () => {
          this.logOut();
        });
      }
    
      componentWillUnmount() {
        EventBus.remove("logout");
      }
    
      logOut() {
        AuthService.logout();
        this.setState({
          showModeratorBoard: false,
          showAdminBoard: false,
          currentUser: undefined,
        });
      }
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link text-dark">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link text-dark">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link text-dark">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link text-dark">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link text-dark">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link text-dark" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link text-dark">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link text-dark">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
      </div>
    )
  }
}
