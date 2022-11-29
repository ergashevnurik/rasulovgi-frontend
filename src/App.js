import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

// import AuthVerify from "./common/auth-verify";

import WarehousesList from "./views/warehouse/warehouse-list.component";
import AddWarehouse from "./views/warehouse/add-warehouse.component";
import Warehouse from "./views/warehouse/warehouse.component";
import Navbar from "./components/navbar/navbar";

class App extends Component {
  

  render() {
    

    return (
      <div>

        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            
            {/* Warehouse Routes Goes Here */}
            <Route path="/warehouse" element={<WarehousesList />} />
            <Route path="/warehouse-add" element={<AddWarehouse/>} />
            <Route path="/warehouse/:id" exact element={<Warehouse/>} />
            {/* Warehouse Routes Ends Here */}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
