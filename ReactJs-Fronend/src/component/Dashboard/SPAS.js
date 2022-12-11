import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import FirstImg from '../../assets/2.jpg';
import ThirdImg from '../../assets/3.jpg';
import FourthImg from '../../assets/4.jpg';

function SPAS() {
    return (
        
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="2000">
                        <img src={FirstImg} class="d-block w-100" alt="" height={500} />
                        <div class="carousel-caption d-none d-md-block">
                            <h5 class="text-dark">Suggest Products</h5>
                            
                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src={FourthImg} class="d-block w-100" alt="" height={500}/>
                        <div class="carousel-caption d-none d-md-block">
                            <h5 class="text-warning"><b>Customer Loyalty Analytics </b></h5>
                            
                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="2000">
                        <img src={ThirdImg} class="d-block w-100" alt="" height={500}/>
                        <div class="carousel-caption d-none d-md-block">
                            <h5 class="text-primary">Procurement Forecasting</h5>
                            
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        
    );
}

export default SPAS;