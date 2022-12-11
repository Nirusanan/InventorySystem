import React, { useState } from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import logoImg from './assets/logo2.png';
import namelogo from './assets/nero.png';
import forecast from './assets/forecast.jpg';
import segment from './assets/segment.jpg';
import suggestion from './assets/gerocery.jpg';
import offer from './assets/loyaltyCard.jpg';



function Login(props) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });


    const onChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(loginData);
        console.log(loginData.email);

        axios.post('http://localhost:4000/login', loginData)
            .then(function (response) {
                console.log(response.data.msg);
                console.log(response.data.token);
                localStorage.setItem("token", response.data.token);
                if (response.data.msg == 'Sucessfull Admin') {
                    props.history.replace("/admin");
                }
                if (response.data.msg == 'Sucessfull Employee') {
                    localStorage.setItem("myemployee", JSON.stringify(loginData));
                    props.history.replace('/employee', { email: loginData.email });

                }
                if (response.data.msg == 'Incorrect') {
                    alert("Incorrect password");
                }
                if (response.data.msg == 'Not valid') {
                    alert("Do not give empty email or password");
                }
                if (response.data.msg == 'Incorrect email') {
                    alert("Incorrect email");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    return (
        <div className="Login">

            <nav className="navbar fixed-top navbar-expand-lg navbar-light">
                <div className="container">
                    <div className="row" style={{ paddingTop: '10px' }}>
                        <div class="col-sm-4">
                            <img src={namelogo} alt="" height={40} width={40} />
                        </div>
                        <div class="col-sm-4">
                            <h3 style={{ textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black', color: 'coral' }}>Nero</h3>
                            <p style={{ textShadow: '0 0 3px #FF0000' }}><b>SuperMarket</b></p>
                        </div>
                    </div>
                    <p style={{ textShadow: '2px 2px 4px #000000', color: 'yellow', fontSize: '30px' }}>Best Analysis!</p>
                    <p><a href="#C4">Login</a></p>
                </div>
            </nav>

            <div className='type-spas'>
                <div class="typing">
                    <h2 class="text-uppercase">Sales and Procurement Analytics</h2>
                </div>
            </div>

            <div className='Login-style' id="C4">
                <div className="auth-wrapper" >
                    <div className="auth-inner">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div class="row g-3" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div class="col-1 col-md-2">
                                    <img src={logoImg} alt="" height={30} width={40} />
                                </div>
                                <div class="col-6 col-md-4">
                                    <h3>Sign In</h3>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>User Name</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={(e) => onChange(e)}
                                    className="form-control"
                                    placeholder="User Name" />
                            </div>
                            <br />
                            
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                type="password" 
                                name="password" 
                                class="form-control" 
                                onChange={(e) => onChange(e)} 
                                placeholder="Enter password" />
                            </div>

                            <br />
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        </form>

                    </div>
                </div>
            </div>


            <div className="login-footer">
                <h4>Services</h4>
                <div class="container" style={{ paddingTop: "10px" }}>
                    <div class="row row-cols-2 row-cols-md-4 g-5">
                        <div class="col">
                            <div class="img-hover-zoom">
                                <img src={forecast} alt='..' width={200} height={200} style={{ borderRadius: "50%" }} />
                            </div>
                            <p style={{ color: "blue" }}>Procurement Forecasting</p>
                        </div>
                        <div class="col">
                            <div class="img-hover-zoom">
                                <img src={segment} alt='..' width={200} height={200} style={{ borderRadius: "50%" }} />
                            </div>
                            <p style={{ color: "blue" }}>Segment analyzing</p>
                        </div>
                        <div class="col">
                            <div class="img-hover-zoom">
                                <img src={suggestion} alt='..' width={200} height={200} style={{ borderRadius: "50%" }} />
                            </div>
                            <p style={{ color: "blue" }}>Product Suggestion</p>
                        </div>
                        <div class="col">
                            <div class="img-hover-zoom">
                                <img src={offer} alt='..' width={200} height={200} style={{ borderRadius: "50%" }} />
                            </div>
                            <p style={{ color: "blue" }}>Providing Offer</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;