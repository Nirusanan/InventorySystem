import React from 'react';
import axios from 'axios';
import NavEmployee from '../NavBar/navEmployee';


export default class productAdd extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: '',
    price: 0.0
  }


  handleChangeName = event => {
    this.setState({ name: event.target.value });
  }

  handleChangePrice = event => {
    this.setState({ price: event.target.value });
  }

  handlePage = () => {
    this.props.history.push("/productview");
  }



  handleSubmit = event => {
    event.preventDefault();



    const user = {
      name: this.state.name,
      price: this.state.price
    };
    console.log(user);

    axios.post('http://localhost:4000/productInsert', user)
      .then(() =>
        alert("Successful insert"))
      // window.location.reload(false))


      .catch(function (error) {
        console.log(error);
      });
  }

  render() {

    return (
      <div className="Product">
        <NavEmployee />
        <div>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <form class="row g-3" onSubmit={this.handleSubmit}>

                <h3> Add Product</h3>

                <div class="col-md-6">
                  <label class="form-label">Product Name</label>
                  <input type="text" class="form-control" onChange={this.handleChangeName} required />
                </div>

                <div class="col-md-6">
                  <label class="form-label">Unit Price</label>
                  <input type="number" class="form-control" onChange={this.handleChangePrice} required />
                </div>


                <button type="submit" className="btn btn-primary btn-block" >Save</button>
              </form>
              <br />
              <button className="btn btn-primary btn-block" onClick={this.handlePage}>View Page</button>
            </div >
          </div >
        </div>
      </div>
    )
  }
}