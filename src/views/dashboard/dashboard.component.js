import React, { Component } from 'react';
import Navbar from '../../components/navbar/navbar';
import Sidebar from "../../components/sidebar/index";

export default class Dashboard extends Component {
  render() {
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
                      <div className="d-flex align-items-center justify-content-center">
                        
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
