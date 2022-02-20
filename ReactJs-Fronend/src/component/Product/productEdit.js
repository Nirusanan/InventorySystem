import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class productEdit extends Component {
    constructor(props){
        super(props);
        console.log(props.history.location.state);  
                
        }
    
    
    state = {
        id: this.props.history.location.state.Id,
        name: this.props.history.location.state.Description,
        price: this.props.history.location.state.UnitPrice,
        redirect: false
    }
    


    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

  

    handleChangePrice = event => {
        this.setState({ price: event.target.value });
    }


    handleSubmit = event => {
        event.preventDefault();

        const user = {
            id: this.state.id,
            name: this.state.name,
            price: this.state.price

        };
        console.log(user);

        axios.post('http://localhost:4000/productUpdate', user)
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
            return <Redirect to='/productview' />;
        }
        return (
        <div className='Product'>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>

                        <h3> Product</h3>


                        <div class="mb-2 row">
                            <label class="col-sm-3 col-form-label"> Product Name: </label>
                            <div class="col-sm-9">
                                <input type="text" name="name" value={this.state.name} className="form-control" onChange={this.handleChangeName} required />
                            </div>
                        </div>


                        <div class="mb-2 row">
                            <label class="col-sm-3 col-form-label"> Price: </label>
                            <div class="col-sm-9">
                                <input type="number" name="age" value={this.state.price} className="form-control" onChange={this.handleChangePrice} required />
                            </div>
                        </div>


                        <button type="submit" className="btn btn-primary btn-block">Update</button>
                    </form>
                </div >
            </div >
            </div>
        )
    }


}

export default productEdit;