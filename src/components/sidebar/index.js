import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { MdDashboard } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { FaWarehouse } from 'react-icons/fa';
import logo from '../../img/logo.svg';


export default class Sidebar extends Component {
  render() {
    return (
      <aside className='container p-3 aside-section'>
        <div className='row px-3 py-3'>
            {/* Logo Should Goes Here */}
            <Link to={"/dashboard"} className="btn w-100 text-center text-dark">
              {/* <h3>RASULOV GI</h3> */}
              <img src={logo} /> 
            </Link>
            {/* Logo Should Ends Here */}
        </div>
        <hr></hr>
        <div className='row px-3 py-2'>
          <Link to={"/dashboard"} className="btn w-100 text-left text-white d-flex align-items-center">
            <MdDashboard className='mx-2' /> Dashboard
          </Link>
        </div>
        <div className='row px-3 py-2'>
          <Link to={"/user"} className="btn w-100 text-left text-white d-flex align-items-center">
            <FiUsers className='mx-2' />Users
          </Link>
        </div>
        <div className='row px-3 py-2'>
          <Link to={"/warehouse"} className="btn w-100 text-left text-white d-flex align-items-center">
            <FaWarehouse className='mx-2' />Warehouses
          </Link>
        </div>
      </aside>
    )
  }
}
