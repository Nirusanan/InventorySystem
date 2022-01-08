import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class Login extends Component {
    render() {
        return (
            <div className="App">

                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">

                        <h3>Sales and Procurement Analytics System</h3>

                    </div>
                </nav>

                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form>
                            <h3>Sign In</h3>

                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text" className="form-control" placeholder="User Name" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>

                            {/* <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>
                            </div> */}
                            
                            <br/>
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>

                        </form>

                    </div>
                </div>




            </div>


        );
    }
}