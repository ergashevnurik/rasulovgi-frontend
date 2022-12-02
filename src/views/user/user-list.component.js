import React, { Component } from "react";
import UserDataService from "./services/user.service";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import AuthService from "../../services/auth.service";
import { Navigate } from "react-router-dom";
import Navbar from '../../components/navbar/navbar';
import Sidebar from "../../components/sidebar/index";
import AddUser from "./add-user.component";
import { Table } from "react-bootstrap";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// To make rows collapsible
import "bootstrap/js/src/collapse.js";


export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
    this.onChangeSearchEmail = this.onChangeSearchEmail.bind(this);
    this.onChangeSearchFirstName = this.onChangeSearchFirstName.bind(this);
    this.onChangeSearchLastName = this.onChangeSearchLastName.bind(this);

    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchUsername: "",
      searchEmail: "",
      searchFirstName: '',
      searchLastName: '',

      page: 1,
      count: 0,
      pageSize: 3,
      currentUser: { username: "" }
    };

    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })

    this.retrieveUsers();
  }

  onChangeSearchUsername(e) {
    const searchUsername = e.target.value;

    this.setState({
      searchUsername: searchUsername,
    });
    
    this.retrieveUsers();
  }

  onChangeSearchEmail(e) {
    const searchEmail = e.target.value;

    this.setState({
      searchEmail: searchEmail,
    });
    
    this.retrieveUsers();
  }

  onChangeSearchFirstName(e) {
    const searchFirstName = e.target.value;

    this.setState({
      searchFirstName: searchFirstName,
    });
    
    this.retrieveUsers();
  }

  onChangeSearchLastName(e) {
    const searchLastName = e.target.value;

    this.setState({
      searchLastName: searchLastName,
    });
    
    this.retrieveUsers();
  }

  getRequestParams(searchFirstName, searchLastName, searchUsername, searchEmail, page, pageSize) {
    let params = {};

    if (searchFirstName) {
      params["firstName"] = searchFirstName;
    }

    if (searchLastName) {
      params["lastName"] = searchLastName;
    }

    if (searchUsername) {
      params["username"] = searchUsername;
    }

    if (searchEmail) {
      params["email"] = searchEmail;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveUsers() {
    const { searchFirstName, searchLastName, searchUsername, searchEmail, page, pageSize } = this.state;
    const params = this.getRequestParams(searchUsername, searchEmail, searchFirstName, searchLastName, page, pageSize);

    UserDataService.getAll(params)
      .then((response) => {
        const { users, totalPages } = response.data;

        this.setState({
          users: users,
          count: totalPages,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1,
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index,
    });
  }

  removeAllUsers() {
    UserDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveUsers();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrieveUsers();
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    const {
      searchUsername,
      users,
      currentIndex,
      page,
      count,
      pageSize,
      searchEmail,
      searchFirstName,
      searchLastName
    } = this.state;

    return (
      <section className="user-list-section">
        <div className="">
          <div className="row m-0 p-0">
            <div className="col-md-2 aside-container-panel m-0 p-0">
              <Sidebar />
            </div>
            <div className="col-md-10 m-0 p-0">
              <Navbar />
              <div className="container-fluid p-3">

                <div className="row">
                  <div className="col-md-12">
                    <div className="">

                      <div className="d-flex align-items-center justify-content-center">
                        <Link to={"/user-add"} className="btn btn-success mr-2">Add User</Link>

                        <button className="btn btn-danger mr-2" onClick={this.removeAllUsers}>
                          Remove All
                        </button>

                        {/* <div className="input-group mr-2" style={{width: "unset"}}>
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={this.retrieveUsers}
                            >
                              Search
                            </button>
                          </div>
                        </div> */}

                        <p className="ml-auto my-0 mr-2">{"Items per Page: "}</p>
                        <select onChange={this.handlePageSizeChange} value={pageSize} className="btn btn-outline-info">
                          {this.pageSizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <Table striped bordered hover className="my-3">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                          </tr>
                          <tr>
                            <th><input type={"checkbox"} /></th>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search by first name"
                                value={searchFirstName}
                                onChange={this.onChangeSearchFirstName}/>
                            </th>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search by last name"
                                value={searchLastName}
                                onChange={this.onChangeSearchLastName}/>
                            </th>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search by username"
                                value={searchUsername}
                                onChange={this.onChangeSearchUsername}/>
                            </th>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search by email"
                                value={searchEmail}
                                onChange={this.onChangeSearchEmail}/>
                            </th>
                          </tr>
                        </thead>

                        {users &&
                          users.map((user, index) => (
                            <tbody key={index}>
                              <tr data-toggle="collapse" data-target={'.multi-collapse' + (index)} aria-controls={'multiCollapseExample' + (index)} className={(index === currentIndex ? "active" : "")} onClick={() => this.setActiveUser(user, index)}>
                                <td><input type={"checkbox"} value={user.id} /></td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                  <Link to={"/user/" + currentUser.id} className="btn btn-warning mr-1">Edit</Link>
                                  <Link to={"/user/" + currentUser.id} className="btn btn-danger">Delete</Link>
                                </td>
                              </tr>
                              <tr className={'collapse multi-collapse' + (index)} id={'multiCollapseExample' + (index)}>
                                  <td></td>
                                  <td>{user.active}</td>
                                  <td>{user.password}</td>
                                  <td></td>
                              </tr>
                            </tbody>
                        ))}
                      
                    </Table>

                    <Pagination className="my-3" count={count} page={page} siblingCount={1} boundaryCount={1} variant="outlined" shape="rounded" onChange={this.handlePageChange} />

                  {/* {currentUser ? (
                    <div>
                      <h4>User</h4>
                      <div>
                        <label>
                          <strong>Username:</strong>
                        </label>{" "}
                        {currentUser.username}
                      </div>
                      <div>
                        <label>
                          <strong>Password:</strong>
                        </label>{" "}
                        {currentUser.password}
                      </div>
                      <div>
                        <label>
                          <strong>Email:</strong>
                        </label>{" "}
                        {currentUser.email}
                      </div>
                      <div>
                        <label>
                          <strong>Status:</strong>
                        </label>{" "}
                        {currentUser.active ? "Active" : "Disactive"}
                      </div>

                      <Link
                        to={"/user/" + currentUser.id}
                        className="badge badge-warning"
                      >
                        Edit
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <br />
                      <p>Please click on a User...</p>
                    </div>
                  )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
