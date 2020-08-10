import React, {Component} from 'react';
import {Link} from "react-router-dom";
import FarmItem from './FarmItem';
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

export default class FarmList extends Component {
  constructor() {
    super();
    this.state = {
      'farms_data':[]
    }
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
      axios.get('http://127.0.0.1:5000/farms')
      .then(response => {
        this.setState({'farms_data':response.data})
      })
  }

  delete (e) {
    let idx = e.target.dataset.id;
    let data = {'id':e.target.dataset.db_id}
    let headers = {'content-type':'application/x-www-form-urlencoded'}
    axios.delete("http://127.0.0.1:5000/farms", {headers: headers, data: qs.stringify(data)})
    .then(response => {
      let tempstate = this.state.farms_data;
      tempstate.splice(idx, 1);
      this.setState({
        farms_data: tempstate
      });
    })
  }

  render() {
    return (
      <div>
      <MDBTypography tag='h1' className="font-weight-bolder text-center py-4"> FARMS </MDBTypography>
      <hr/>
      <MDBContainer>
        <MDBCard>
          <MDBListGroup>
            {this.state.farms_data.map((item,idx) => {
              return (
                <MDBListGroupItem key={idx}>
                  <FarmItem farm={item} idx={idx} onDelete={this.delete}/>
                </MDBListGroupItem>
              )
            })}
          </MDBListGroup>
        </MDBCard>
        <Link to="/add-farm">
          <MDBBtn color="primary">
            Add a Farm
          </MDBBtn>
        </Link>
      </MDBContainer>
      </div>
    )
  }
}
