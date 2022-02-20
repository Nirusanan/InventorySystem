import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class customerEdit extends Component {
    constructor(props){
        super(props);
        console.log(props.history.location.state);  
                
        }
    
    
    state = {
        id: this.props.history.location.state.Id,
        name: this.props.history.location.state.Name,
        address: this.props.history.location.state.City,
        mobile: this.props.history.location.state.MobileNumber,
        createdOn: this.props.history.location.state.CreatedOn,
        redirect: false
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

    handleChangeCreatedon = event => {
        this.setState({ createdOn: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            id: this.state.id,
            name: this.state.name,
            address: this.state.address,
            mobile: this.state.mobile,
            createdOn: this.state.createdOn,


        };
        console.log(user);

        axios.post('http://localhost:4000/customerUpdate', user)
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
            return <Redirect to='/customerview' />;
        }
        return (
            <div className='EditCustomer'>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>

                        <h3> Customer</h3>

                        

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
                                <input type="text" name="mobile" value={this.state.mobile} className="form-control" onChange={this.handleChangeMobile}  placeholder={this.state.mobile} required />
                            </div>
                        </div>


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

export default customerEdit;