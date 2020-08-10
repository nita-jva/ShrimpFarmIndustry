import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBTypography
} from 'mdbreact';

export default class PondAdd extends Component {
  constructor(props) {
    super(props);
    if(this.props.location.pond) {
      this.state = {
        name:this.props.location.pond.name,
        size:this.props.location.pond.size,
        base_url: 'http://127.0.0.1:5000/ponds/' + this.props.location.farm.farmId
      }
    }
    else 
      this.state = {'base_url': 'http://127.0.0.1:5000/ponds/' + this.props.location.farm.farmId}
    this.submitHandler = this.submitHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }

  submitHandler(event) {
    event.preventDefault();
    if(!this.state.name || !this.state.size)
    {
      return ;
    }
    else
    {
      let headers = {headers: {'content-type':'application/x-www-form-urlencoded'}}
      event.target.className += " was-validated";
      var data = {};
      data.name = this.state.name;
      data.size = this.state.size;
      if(this.props.location.pond) {
        data.id = this.props.location.pond.pondId;
        axios.patch(this.state.base_url, qs.stringify(data), headers)
        .then(response =>{
          this.props.history.push({
            pathname: '/pond',
            farm: this.props.location.farm,
          })
        })
      }
      else
      {
        axios.post(this.state.base_url, qs.stringify(data), headers)
        .then(response =>{
          this.props.history.push({
            pathname: '/pond',
            farm: this.props.location.farm,
          })
        })
      }
    }
  }

  changeHandler(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div>
        <MDBTypography tag='h1' className="font-weight-bolder text-center py-4"> Ponds in Farm {this.props.location.farm.name} </MDBTypography>
        <hr/>
        <MDBContainer>
          <Link to={{
            pathname: "/pond",
            farm: this.props.location.farm,
          }}>
            <i
              className="fas fa-arrow-left pr-2"
            >
            </i>
            Back
          </Link>
        </MDBContainer>
        <MDBContainer>
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate>
            <MDBInput
              outline
              required
              label="Pond Name"
              name="name"
              onChange={this.changeHandler}
              type="text"
              value={this.state.name}
            >
              <div className="invalid-feedback">Please enter a name for the pond</div>
            </MDBInput>
            <MDBInput
              outline
              required
              label="Pond Area in hectares"
              name="size"
              onChange={this.changeHandler}
              type="number"
              step="0.01"
              value={this.state.size}
            >
              <div className="invalid-feedback">Please enter the area</div>
            </MDBInput>
            <MDBBtn color="success" size="sm" type="submit">
              Submit
            </MDBBtn>
          </form>
        </MDBContainer>
      </div>
    )
  }
}
