import React, {Component} from 'react';
import axios from "axios";
import {
  MDBBtn
} from 'mdbreact';
import {Link} from "react-router-dom";
import qs from 'qs';

export default class FarmItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let data = {'id':this.props.farm.farmId}
    let headers = {'content-type':'application/x-www-form-urlencoded'}
    axios.post('http://127.0.0.1:5000/farms/total-area', qs.stringify(data), {headers: headers})
      .then(response => {
        if (response.data)
          this.setState({'area':response.data})
        else
          this.setState({'area':0})
      })
  }

  render() {
    let area
    if (this.state)
       area = this.state.area;
    return (
      <div>
        <div className='d-flex justify-content-between align-items-center'>
          <div className="h5-responsive">
            {this.props.farm.name}
          </div>
          Total Area: {area}
          <div>
          <Link to={{
            pathname: "/pond",
            farm: this.props.farm,
          }}>
            <MDBBtn
              color="success"
              size="sm"
            >View Ponds</MDBBtn>
          </Link>
          <Link to={{
            pathname: "/edit-farm",
            farm: this.props.farm,
          }}>
            <MDBBtn
              color="warning"
              size="sm"
            >Edit</MDBBtn>
          </Link>
          <MDBBtn
              color="danger"
              size="sm"
              data-id={this.props.idx}
              data-db_id={this.props.farm.farmId}
              onClick={this.props.onDelete}>Delete</MDBBtn>
          </div>
        </div>
    </div>
    )
  }
}
