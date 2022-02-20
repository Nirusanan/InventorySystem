import React from 'react';
import { Link } from "react-router-dom";
import AdminImg from './Admin2.png';

function NavAdmin() {
    return (

        <nav class="navbar navbar-dark bg-dark">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    {/* <a class="nav-link active" aria-current="page" href="#">SPAS</a> */}
                    <Link class="nav-link active" aria-current="page" to="/admin">SPAS</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/employeeview">Employee</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/segment">Customer Segment</Link>
                </li>

            </ul>

            <div class="d-flex flex-row bd-highlight mb-3">
                <div class="p-2 bd-highlight">
                
                    <img src={AdminImg}  alt="" height={32} width={48} />
                    <h5 class="text-success">Admin</h5>
                
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

export default NavAdmin;