import React, {Component} from 'react';
import axios from "axios";
import {
  MDBBtn
} from 'mdbreact';
import {Link} from "react-router-dom";

export default class PondItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='d-flex justify-content-between align-items-center'>
          <div className="h5-responsive">
            {this.props.pond.name}
          </div>
            Area of Pond (in hectares) : {this.props.pond.size}
          <div>
            <Link to={{
              pathname: "/edit-pond",
              pond: this.props.pond,
              farm: this.props.farm,
            }}>
            <MDBBtn
              color="warning"
              size="sm"
            >Update</MDBBtn>
            </Link>
            <MDBBtn
            color="danger"
            size="sm"
            data-id={this.props.idx}
            data-db_id={this.props.pond.pondId}
            onClick={this.props.onDelete}>Delete</MDBBtn>
          </div>
        </div>
    </div>
    )
  }
}
