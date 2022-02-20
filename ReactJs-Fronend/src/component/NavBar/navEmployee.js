import React from 'react';
import { Link } from "react-router-dom";
import EmployeeImg from './employee3.jpg';

function NavEmployee() {
    return (
        <nav class="navbar navbar-dark bg-dark">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/employee">SPAS</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/productview">Product</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/customerview">Customer</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/invoice">Invoice</Link>
                </li>
                

            </ul>

            <div class="d-flex flex-row bd-highlight mb-3">
                <div class="p-2 bd-highlight">

                    <img src={EmployeeImg} alt="" height={32} width={70} />
                    <h5 class="text-success">Employee</h5>

                </div>
            </div>
            {/* <div class="d-flex align-items-center">
                    <h3 class="text-success">Admin</h3>
                </div> */}

            <div class="d-flex ">
                <Link class="link-danger" to="/">Sign Out</Link>


            </div>

        </nav>
    );
}

export default NavEmployee;