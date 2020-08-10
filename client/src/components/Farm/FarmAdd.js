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

export default class FarmAdd extends Component {
  constructor(props) {
    super(props);
    if(this.props.location.farm) {
      this.state = {name:this.props.location.farm.name}
    }
    else 
      this.state = {}

    this.submitHandler = this.submitHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)

  }

  submitHandler(event) {
    if(!this.state.name)
    {
      return ;
    }
    else
    {
      event.preventDefault();
      event.target.className += " was-validated";
      let headers = {headers: {'content-type':'application/x-www-form-urlencoded'}}
      var data = {};
      data.name = this.state.name;
      if(this.props.location.farm) {
        data.id = this.props.location.farm.farmId;
        axios.patch('http://127.0.0.1:5000/farms', qs.stringify(data), headers)
        .then(response =>{
          this.props.history.push('/')
        })
      }
      else
      {
        axios.post('http://127.0.0.1:5000/farms', qs.stringify(data), headers)
        .then(response =>{
          this.props.history.push('/')
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
        <MDBTypography tag='h1' className="font-weight-bolder text-center py-4"> FARMS </MDBTypography>
        <hr/>
        <MDBContainer>
          <Link to='/' style={{'display':'unset'}}>
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
              label="Farm Name"
              name="name"
              onChange={this.changeHandler}
              type="text"
              value={this.state.name}
            >
              <div className="invalid-feedback">Please enter a name for the farm</div>
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
