import React from 'react';
import axios from 'axios';

export default class PersonAdd extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    address: '',
    mobile: 77,
    age: 2,
    admin: 1,
    createdOn: ''


  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  }

  handleChangeAddress = event => {
    this.setState({ address: event.target.value });
  }

  handleChangeMobile = event => {
    this.setState({ mobile: event.target.value });
  }

  handleChangeAge = event => {
    this.setState({ age: event.target.value });
  }

  handleChangeAdmin = event => {
    this.setState({ admin: event.target.value });
  }

  handleChangeCreatedon = event => {
    this.setState({ createdOn: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      address: this.state.address,
      mobile: this.state.mobile,
      age: this.state.age,
      admin: this.state.admin,
      createdOn: this.state.createdOn,


    };
    console.log(user);

    // axios.post(`http://localhost:4000/insert`, {headers: {'Content-Type': 'application/json'} , user })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })

    axios.post('http://localhost:4000/insert', user)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (

      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>

            <h3> Employee</h3>
            
            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label">Email: </label>
              <div class="col-sm-9">
                <input type="text" name="email" class="form-control" onChange={this.handleChangeEmail} required/>
              </div>

            </div>

            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label"> Password: </label>
              <div class="col-sm-9">
                <input type="text" name="password" class="form-control" onChange={this.handleChangePassword} required/>
              </div>
            </div>

            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label"> Name: </label>
              <div class="col-sm-9">
                <input type="text" name="name" className="form-control" onChange={this.handleChangeName} required/>
              </div>
            </div>


            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label"> Address: </label>
              <div class="col-sm-9">
                <input type="text" name="address" className="form-control" onChange={this.handleChangeAddress} required/>
              </div>
            </div>


            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label"> Mobile: </label>
              <div class="col-sm-9">
                <input type="number" name="mobile" className="form-control" onChange={this.handleChangeMobile} required/>
              </div>
            </div>

            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label"> Age: </label>
              <div class="col-sm-9">
                <input type="number" name="age" className="form-control" onChange={this.handleChangeAge} required/>
              </div>
            </div>


            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label"> Admin: </label>
              <div class="col-sm-9">
                <input type="number" name="admin" className="form-control" onChange={this.handleChangeAdmin} required/>
              </div>
            </div>


            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label"> CreatedOn: </label>
              <div class="col-sm-9">
                <input type="date" name="createdOn" className="form-control" onChange={this.handleChangeCreatedon} required/> </div>
            </div>



            <button type="submit" className="btn btn-primary btn-block">Add</button>
          </form>
        </div >
      </div >
    )
  }
}