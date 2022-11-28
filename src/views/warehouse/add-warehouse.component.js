import React, { Component } from "react";
import WarehouseDataService from "./services/warehouse.service";

export default class AddWarehouse extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveWarehouse = this.saveWarehouse.bind(this);
    this.newWarehouse = this.newWarehouse.bind(this);

    this.state = {
      id: null,
      name: "",
      location: "",
      description: "", 
      active: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveWarehouse() {
    var data = {
      name: this.state.name,
      location: this.state.location,
      description: this.state.description
    };

    WarehouseDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          location: response.data.location,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newWarehouse() {
    this.setState({
      id: null,
      name: "",
      location: "",
      description: "",
      active: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newWarehouse}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                required
                value={this.state.location}
                onChange={this.onChangeLocation}
                name="location"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveWarehouse} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
