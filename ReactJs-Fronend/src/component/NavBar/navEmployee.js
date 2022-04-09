import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import EmployeeImg from './employee.jpg';

function NavEmployee(props) {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");

    const result = JSON.parse(localStorage.getItem("myemployee"));
    console.log(result);


    const handleProfile = () => {

        axios.post('http://localhost:4000/profile', { "email": result.email })
            .then(function (response) {
                setName(response.data[0].Name);
                setAddress(response.data[0].Address);
                setMobile(response.data[0].Mobile);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <nav class="navbar fixed-top navbar-dark bg-dark" style={{ paddingBottom: "1px" }} >
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <Link class="nav-link active bi bi-house-fill" aria-current="page" to="/employee"> Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" style={{ color: 'red' }} to="/productview">Product</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" style={{ color: 'red' }} to="/customerview">Customer</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" style={{ color: 'red' }} to="/invoice">Invoice</Link>
                    </li>
                </ul>

                <div class="d-flex flex-row bd-highlight mb-3">
                    <div class="p-2 bd-highlight">

                        <img src={EmployeeImg} alt="" height={40} width={70} />
                        <h5 class="text-success">Employee</h5>

                    </div>
                </div>


                <div class="dropdown-primary dropdown" style={{ paddingRight: "120px" }}>
                    <span class="d-block link-primary text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle" />
                    </span>
                    <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1" >
                        <li class="dropdown-item" data-bs-toggle="modal" data-bs-target="#profileModal" onClick={() => handleProfile()}><p class="bi bi-person-circle" style={{ cursor: "pointer" }}> View profile</p></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li class="dropdown-item" >
                            <Link class="bi bi-box-arrow-right link-dark" style={{ textDecoration: "none" }} to="/"   onClick={() =>localStorage.clear()}> Sign out</Link>
                        </li>
                    </ul>
                </div>

            </nav>

            <div class="modal fade" id="profileModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="modal-title w-100 text-center">
                                <h5 class="bi bi-person-circle" id="profileModalLabel" > Profile</h5>
                                <p class="text-primary">{result.email}</p>
                            </div>
                        </div>
                        <div class="modal-body">
                            <div class="mb-2 row">
                                <label class="col-sm-2 col-form-label"> Name: </label>
                                <label class="col-sm-2 col-form-label"> {name} </label>
                            </div>

                            <div class="mb-2 row">
                                <label class="col-sm-2 col-form-label"> Address: </label>
                                <label class="col-sm-2 col-form-label"> {address} </label>
                            </div>

                            <div class="mb-2 row">
                                <label class="col-sm-2 col-form-label"> Mobile: </label>
                                <label class="col-sm-2 col-form-label"> {mobile} </label>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavEmployee;