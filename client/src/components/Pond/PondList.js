import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PondItem from './PondItem';
import qs from 'qs';
import axios from 'axios';
import {
  MDBCard,
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBBtn,
  MDBTypography
} from "mdbreact";

export default class PondList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'ponds_data':[],
      'base_url': 'http://127.0.0.1:5000/ponds/' + this.props.location.farm.farmId
    }
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
      axios.get(this.state.base_url)
      .then(response => {
        this.setState({'ponds_data':response.data})
      })
  }

  delete (e) {
    let idx = e.target.dataset.id;
    let data = {'id':e.target.dataset.db_id}
    let headers = {'content-type':'application/x-www-form-urlencoded'}
    axios.delete(this.state.base_url, {headers: headers, data: qs.stringify(data)})
    .then(response => {
      let tempstate = this.state.ponds_data;
      tempstate.splice(idx, 1);
      this.setState({
        ponds_data: tempstate
      });
    })
  }

  render() {
    return (
      <div>
      <MDBTypography tag='h1' className="font-weight-bolder text-center py-4"> Ponds in Farm {this.props.location.farm.name} </MDBTypography>
      <hr/>
      <MDBContainer>
        <Link to={{
          pathname: "/",
        }}>
          <i
            className="fas fa-arrow-left pr-2"
          >
          </i>
          Back
        </Link>
        <MDBCard className="mt-2">
          <MDBListGroup>
            {this.state.ponds_data.map((item,idx) => {
              return (
                <MDBListGroupItem key={idx}>
                  <PondItem pond={item} farm={this.props.location.farm} idx={idx} onDelete={this.delete}/>
                </MDBListGroupItem>
              )
            })}
          </MDBListGroup>
        </MDBCard>
        <Link to={{
          pathname: "/add-pond",
          farm: this.props.location.farm,
        }}>
          <MDBBtn color="primary">
            Add a Pond
          </MDBBtn>
        </Link>
      </MDBContainer>
      </div>
    )
  }
}
