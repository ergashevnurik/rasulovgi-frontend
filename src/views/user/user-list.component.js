import React, { Component } from "react";
import UserDataService from "./services/user.service";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import AuthService from "../../services/auth.service";
import { Navigate } from "react-router-dom";
import Navbar from '../../components/navbar/navbar';
import Sidebar from "../../components/sidebar/index";


export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
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

      page: 1,
      count: 0,
      pageSize: 3,
      urrentUser: { username: "" }
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
  }

  getRequestParams(searchUsername, page, pageSize) {
    let params = {};

    if (searchUsername) {
      params["username"] = searchUsername;
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
    const { searchUsername, page, pageSize } = this.state;
    const params = this.getRequestParams(searchUsername, page, pageSize);

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
    } = this.state;

    return (
      <section className="user-list-section">
        <div className="">
          <div className="row m-0 p-0">
            <div className="col-md-2 m-0 p-0">
              <Sidebar />
            </div>
            <div className="col-md-10 m-0 p-0">
              <Navbar />
              <div className="container p-3">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchUsername}
                    onChange={this.onChangeSearchUsername}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={this.retrieveUsers}
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h4>Users List</h4>

                    <div className="mt-3">
                      {"Items per Page: "}
                      <select onChange={this.handlePageSizeChange} value={pageSize}>
                        {this.pageSizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>

                      <Pagination
                        className="my-3"
                        count={count}
                        page={page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={this.handlePageChange}
                      />
                    </div>

                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users &&
                          users.map((user, index) => (
                          <tr className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => this.setActiveUser(user, index)} key={index}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <button
                      className="m-3 btn btn-sm btn-danger"
                      onClick={this.removeAllUsers}
                    >
                      Remove All
                  </button>
                </div>
                <div className="col-md-6">
                  {currentUser ? (
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
                        {currentUser.published ? "Published" : "Pending"}
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
                  )}
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
