import React, { Component } from 'react';
import Navbar from '../../components/navbar/navbar';
import Sidebar from "../../components/sidebar/index";
import AuthService from "../../services/auth.service";
import { Navigate } from "react-router-dom";
import { FaIcons } from 'react-icons/fa';
import {MdProductionQuantityLimits} from 'react-icons/md';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {username: ''}
    }
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
        <section className="dashboard-section">
        <div className="">
          <div className="row m-0 p-0">
            <div className="col-md-2 aside-container-panel m-0 p-0">
              <Sidebar />
            </div>
            <div className="col-md-9 m-0 p-0">
              <Navbar />
              <div className="container-fluid p-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="">
                      <div className="d-flex align-items-center">
                        <div className='card m-2 rounded'>
                          <div className='m-2 d-flex justify-content-between flex-row align-items-center p-3'>
                            <MdProductionQuantityLimits className=' font-lg' />
                            <div className='ml-5 text-right'>
                              <h2 className='p-0 m-0 font-lg'>1232</h2>
                              <p className='p-0 m-0'>In Warehouse</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
