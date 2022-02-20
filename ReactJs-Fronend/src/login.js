import React, { useState } from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import logoImg from './assets/logo2.png'



function Login(props) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });


    const onChange = (e) =>
        setLoginData({ ...loginData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(loginData);

        axios.post('http://localhost:4000/login', loginData)
            .then(function (response) {
                console.log(response.data.msg);
                if (response.data.msg == 'Sucessfull Admin') {
                    props.history.replace("/admin");
                }
                if (response.data.msg == 'Sucessfull Employee') {
                    props.history.replace('/employee');
                }
                if (response.data.msg == 'Incorrect') {
                    alert("Incorrect username and password");
                }
                if (response.data.msg == 'Not valid') {
                    alert("Do not give empty email or password");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    return (
        <div className="App" >

            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">

                    <h3>Sales and Procurement Analytics System</h3>

                </div>
            </nav>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={(e) => onSubmit(e)}>
                        
                        <div class="row g-3" style={{display: 'flex',  justifyContent:'center'}}>
                            <div class="col-sm-4 col-md-2">
                            <img src={logoImg}  alt="" height={30} width={40} />
                            </div>
                            <div class="col-6 col-md-4">
                            <h3>Sign In</h3>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>User Name</label>
                            <input type="text" name="email" onChange={(e) => onChange(e)} className="form-control" placeholder="User Name" />
                        </div>
                        <br />

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" class="form-control" onChange={(e) => onChange(e)} placeholder="Enter password" />
                        </div>


                        <br />

                        <button type="submit" className="btn btn-primary btn-block">Submit</button>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default Login;