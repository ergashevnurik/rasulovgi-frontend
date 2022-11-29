import React, { Component } from "react";
import WarehouseDataService from "./services/warehouse.service";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import AuthService from "../../services/auth.service";
import { Navigate } from "react-router-dom";
import Navbar from '../../components/navbar/navbar';
import Sidebar from "../../components/sidebar/index";


export default class WarehousesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveWarehouses = this.retrieveWarehouses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveWarehouse = this.setActiveWarehouse.bind(this);
    this.removeAllWarehouses = this.removeAllWarehouses.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      warehouses: [],
      currentWarehouse: null,
      currentIndex: -1,
      searchName: "",

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

    this.retrieveWarehouses();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  getRequestParams(searchName, page, pageSize) {
    let params = {};

    if (searchName) {
      params["name"] = searchName;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveWarehouses() {
    const { searchName, page, pageSize } = this.state;
    const params = this.getRequestParams(searchName, page, pageSize);

    WarehouseDataService.getAll(params)
      .then((response) => {
        const { warehouses, totalPages } = response.data;

        this.setState({
          warehouses: warehouses,
          count: totalPages,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveWarehouses();
    this.setState({
      currentWarehouse: null,
      currentIndex: -1,
    });
  }

  setActiveWarehouse(warehouse, index) {
    this.setState({
      currentWarehouse: warehouse,
      currentIndex: index,
    });
  }

  removeAllWarehouses() {
    WarehouseDataService.deleteAll()
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
        this.retrieveWarehouses();
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
        this.retrieveWarehouses();
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    const {
      searchName,
      warehouses,
      currentWarehouse,
      currentIndex,
      page,
      count,
      pageSize,
    } = this.state;

    return (
      <section className="warehouse-list-section">
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
                    value={searchName}
                    onChange={this.onChangeSearchName}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={this.retrieveWarehouses}
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h4>Warehouses List</h4>

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

                    <ul className="list-group">
                      {warehouses &&
                        warehouses.map((warehouse, index) => (
                          <li
                            className={
                              "list-group-item " +
                              (index === currentIndex ? "active" : "")
                            }
                            onClick={() => this.setActiveWarehouse(warehouse, index)}
                            key={index}
                          >
                            {warehouse.name}
                          </li>
                        ))}
                    </ul>

                    <button
                      className="m-3 btn btn-sm btn-danger"
                      onClick={this.removeAllWarehouses}
                    >
                      Remove All
                  </button>
                </div>
                <div className="col-md-6">
                  {currentWarehouse ? (
                    <div>
                      <h4>Warehouse</h4>
                      <div>
                        <label>
                          <strong>Name:</strong>
                        </label>{" "}
                        {currentWarehouse.name}
                      </div>
                      <div>
                        <label>
                          <strong>Location:</strong>
                        </label>{" "}
                        {currentWarehouse.location}
                      </div>
                      <div>
                        <label>
                          <strong>Description:</strong>
                        </label>{" "}
                        {currentWarehouse.description}
                      </div>
                      <div>
                        <label>
                          <strong>Status:</strong>
                        </label>{" "}
                        {currentWarehouse.published ? "Published" : "Pending"}
                      </div>

                      <Link
                        to={"/warehouse/" + currentWarehouse.id}
                        className="badge badge-warning"
                      >
                        Edit
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <br />
                      <p>Please click on a Warehouse...</p>
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
