import React from 'react';
import { Link } from "react-router-dom";
import AdminImg from './Admin2.png';

function NavAdmin() {
    return (

        <nav class="navbar sticky-top navbar-dark bg-dark" >
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <Link class="nav-link active bi bi-house-fill" aria-current="page" to="/admin"> Home</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" style={{color:'blue'}} to="/employeeview">Employee</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" style={{color:'blue'}} to="/segment">Customer Segment</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" style={{color:'blue'}} to="/forecast">Forecasting</Link>
                </li>

            </ul>

            <div class="d-flex flex-row bd-highlight mb-3">
                <div class="p-2 bd-highlight">
                
                    <img src={AdminImg}  alt="" height={32} width={48} />
                    <h5 class="text-success">Admin</h5>
                
                </div>
            </div>
            

            <div class="d-flex" style={{paddingRight: "20px"}}>
                <Link class="link-danger" style={{textDecoration: "none", display: "inline",width: "100px",textAlign: "center", backgroundColor: "rgb(34, 94, 46)", borderRadius: "20px", padding: "4px"}} to="/" onClick={() =>localStorage.clear()}>Sign Out</Link> 
            </div>

        </nav>
    );
}

export default NavAdmin;