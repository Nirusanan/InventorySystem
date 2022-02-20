import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import FirstImg from './1.jpg';
import ThirdImg from './3.jpg';
import FourthImg from './4.jpg';

function SPAS() {
    return (
        
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={FirstImg} class="d-block w-100" alt="" height={490} />
                        <div class="carousel-caption d-none d-md-block">
                            <h5 class="text-dark">Association Rules Generation</h5>
                            {/* <p>Some representative placeholder content for the first slide.</p> */}
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={FourthImg} class="d-block w-100" alt="" height={490}/>
                        <div class="carousel-caption d-none d-md-block">
                            <h5 class="text-warning"><b>Customer Loyalty Analytics </b></h5>
                            {/* <p >Some representative placeholder content for the second slide.</p> */}
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={ThirdImg} class="d-block w-100" alt="" height={490}/>
                        <div class="carousel-caption d-none d-md-block">
                            <h5 class="text-primary">Procurement Forecasting</h5>
                            {/* <p>Some representative placeholder content for the third slide.</p> */}
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