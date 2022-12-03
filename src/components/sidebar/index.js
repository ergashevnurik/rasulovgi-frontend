import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { MdDashboard } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { FaWarehouse } from 'react-icons/fa';
import {TbBrandProducthunt} from 'react-icons/tb';
import logo from '../../img/logo.svg';
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";

export default class Sidebar extends Component {
  
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
      <aside className='container p-3 aside-section'>
        <div className=''>
          <div className='row px-3 py-3'>
              {/* Logo Should Goes Here */}
              <Link to={"/dashboard"} className="btn w-100 text-center text-dark">
                {/* <h3>RASULOV GI</h3> */}
                <img src={logo} /> 
              </Link>
              {/* Logo Should Ends Here */}
          </div>
          <hr></hr>
          {showAdminBoard && (
            <>
              <div className='row px-3 py-2'>
                <Link to={"/dashboard"} className="btn w-100 text-left text-dark d-flex align-items-center">
                  <MdDashboard className='mx-2' /> Dashboard
                </Link>
              </div>
              <div className='row px-3 py-2'>
                <Link to={"/user"} className="btn w-100 text-left text-dark d-flex align-items-center">
                  <FiUsers className='mx-2' />Users
                </Link>
              </div>
              <div className='row px-3 py-2'>
                <Link to={"/warehouse"} className="btn w-100 text-left text-dark d-flex align-items-center">
                  <FaWarehouse className='mx-2' />Warehouses
                </Link>
              </div>
            </>
          )}

          {showModeratorBoard || currentUser && (
            <>
              <div className='row px-3 py-2'>
                <Link to={"/product"} className="btn w-100 text-left text-dark d-flex align-items-center">
                  <TbBrandProducthunt className='mx-2' />Product
                </Link>
              </div>
            </>
          )}
        </div>
        <div className=''>
          <div className='card profile-card'>
            <div className='profile-card-head'>

            </div>
            <div className='profile-card-body'>
              {currentUser ? (<h1>Dear {currentUser.username}</h1>) : (<h1>Dear User</h1>)}
              <p>Improve your development process and start doing more with Horizon UI PRO!</p>
              <a href='/profile'>See Profile</a>
            </div>
          </div>
        </div>
      </aside>
    )
  }
}
