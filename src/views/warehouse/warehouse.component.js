import React, { Component } from "react";
import WarehouseDataService from "./services/warehouse.service";
import AuthService from "../../services/auth.service";
import { Navigate } from "react-router-dom";
import { withRouter } from '../../common/with-router';
import Navbar from '../../components/navbar/navbar';
import Sidebar from "../../components/sidebar/index";
import Footer from "../../components/footer/footer";

class Warehouse extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getWarehouse = this.getWarehouse.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.updateWarehouse = this.updateWarehouse.bind(this);
    this.deleteWarehouse = this.deleteWarehouse.bind(this);

    this.state = {
      currentWarehouse: {
        id: undefined,
        name: "",
        location: "",
        description: "",
        active: false
      },
      message: "",
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })

    console.log(this.props.router.params.id);
    this.getWarehouse(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentWarehouse: {
          ...prevState.currentWarehouse,
          name: name
        }
      };
    });
  }

  onChangeLocation(e) {
    const location = e.target.value;
    
    this.setState(prevState => ({
      currentWarehouse: {
        ...prevState.currentWarehouse,
        location: location
      }
    }));
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentWarehouse: {
        ...prevState.currentWarehouse,
        description: description
      }
    }));
  }

  getWarehouse(id) {
    WarehouseDataService.get(id)
      .then(response => {
        this.setState({
          currentWarehouse: response.data
        });
        console.log("DATA: " + response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateActive(status) {
    var data = {
      id: this.state.currentWarehouse.id,
      name: this.state.currentWarehouse.name,
      location: this.state.currentWarehouse.location,
      description: this.state.currentWarehouse.description,
      active: status
    };

    WarehouseDataService.update(this.state.currentWarehouse.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentWarehouse: {
            ...prevState.currentWarehouse,
            active: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateWarehouse() {
    WarehouseDataService.update(
      this.state.currentWarehouse.id,
      this.state.currentWarehouse
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The warehouse was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteWarehouse() {    
    WarehouseDataService.delete(this.state.currentWarehouse.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/warehouses')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    const { currentWarehouse } = this.state;

    return (
      <section className="user-add-section">
        <div className="">
          <div className="row m-0 p-0">
            <div className="col-md-2 aside-container-panel m-0 p-0">
              <Sidebar />
            </div>
            <div className="col-md-9 m-0 p-0">
              <Navbar />
              <div className="container-fluid p-3">
                {currentWarehouse ? (
                  <div className="edit-form">
                    <h4>Warehouse</h4>
                    <form>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={currentWarehouse.name}
                          onChange={this.onChangeName}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                          type="text"
                          className="form-control"
                          id="location"
                          value={currentWarehouse.location}
                          onChange={this.onChangeLocation}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          value={currentWarehouse.description}
                          onChange={this.onChangeDescription}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <strong>Status:</strong>
                        </label>
                        {currentWarehouse.active ? "Active" : "Unactive"}
                      </div>
                    </form>

                    {currentWarehouse.active ? (
                      <button
                        className="badge badge-primary mr-2"
                        onClick={() => this.updateActive(false)}
                      >
                        UnActive
                      </button>
                    ) : (
                      <button
                        className="badge badge-primary mr-2"
                        onClick={() => this.updateActive(true)}
                      >
                        Publish
                      </button>
                    )}

                    <button
                      className="badge badge-danger mr-2"
                      onClick={this.deleteWarehouse}
                    >
                      Delete
                    </button>

                    <button
                      type="submit"
                      className="badge badge-success"
                      onClick={this.updateWarehouse}
                    >
                      Update
                    </button>
                    <p>{this.state.message}</p>
                  </div>
                ) : (
                  <div>
                    <br />
                    <p>Please click on a Warehouse...</p>
                  </div>
                )}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Warehouse);