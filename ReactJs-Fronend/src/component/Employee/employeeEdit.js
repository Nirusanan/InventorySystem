import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import NavAdmin from '../NavBar/navAdmin';


class Update extends Component {
    constructor(props) {
        super(props);
        console.log(props.history.location.state);

    }


    state = {
        id: this.props.history.location.state.Id,
        email: this.props.history.location.state.UserName,
        password: this.props.history.location.state.Password,
        name: this.props.history.location.state.Name,
        address: this.props.history.location.state.Address,
        mobile: this.props.history.location.state.Mobile,
        age: this.props.history.location.state.Age,
        admin: this.props.history.location.state.IsAdmin,
        createdOn: this.props.history.location.state.CreatedOn,
        redirect: false
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
            id: this.state.id,
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

        axios.post('http://localhost:4000/update', user)
            .then(() => this.setState({ redirect: true }))
            // .then(function (response) {
            //     console.log(response);
            //     
            // })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/employeeview' />;
        }
        return (
            <div className='Employee'>
                <NavAdmin />
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={this.handleSubmit}>

                            <h3> Employee</h3>

                            <div class="mb-2 row">
                                <label class="col-sm-3 col-form-label">Email: </label>
                                <div class="col-sm-9">
                                    <input type="text" value={this.state.email} name="email" class="form-control" onChange={this.handleChangeEmail} required />
                                </div>


                            </div>

                            <div class="mb-2 row">
                                <label class="col-sm-3 col-form-label"> Password: </label>
                                <div class="col-sm-9">
                                    <input type="text" value={this.state.password} name="password" class="form-control" onChange={this.handleChangePassword} required />
                                </div>
                            </div>

                            <div class="mb-2 row">
                                <label class="col-sm-3 col-form-label"> Name: </label>
                                <div class="col-sm-9">
                                    <input type="text" name="name" value={this.state.name} className="form-control" onChange={this.handleChangeName} required />
                                </div>
                            </div>


                            <div class="mb-2 row">
                                <label class="col-sm-3 col-form-label"> Address: </label>
                                <div class="col-sm-9">
                                    <input type="text" name="address" value={this.state.address} className="form-control" onChange={this.handleChangeAddress} required />
                                </div>
                            </div>


                            <div class="mb-2 row">
                                <label class="col-sm-3 col-form-label"> Mobile: </label>
                                <div class="col-sm-9">
                                    <input type="number" name="mobile" value={this.state.mobile} className="form-control" onChange={this.handleChangeMobile} placeholder={this.state.mobile} required />
                                </div>
                            </div>

                            <div class="mb-2 row">
                                <label class="col-sm-3 col-form-label"> Age: </label>
                                <div class="col-sm-9">
                                    <input type="number" name="age" value={this.state.age} className="form-control" onChange={this.handleChangeAge} required />
                                </div>
                            </div>


                            {/* <div class="mb-2 row">
                            <label class="col-sm-3 col-form-label"> Admin: </label>
                            <div class="col-sm-9">
                                <input type="number" name="admin" value={this.state.admin} className="form-control" onChange={this.handleChangeAdmin} required />
                            </div>
                        </div> */}


                            <div class="mb-2 row">
                                <label class="col-sm-3 col-form-label"> CreatedOn: </label>
                                <div class="col-sm-9">
                                    <input type="date" name="createdOn" value={this.state.createdOn} className="form-control" onChange={this.handleChangeCreatedon} required /> </div>
                            </div>



                            <button type="submit" className="btn btn-primary btn-block">Update</button>
                        </form>
                    </div >
                </div >
            </div>
        )
    }


}

export default Update;