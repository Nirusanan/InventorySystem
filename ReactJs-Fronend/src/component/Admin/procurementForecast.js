// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NavAdmin from '../NavBar/navAdmin';
// import Copyright from '../Footer/footer';
// import Box from '@material-ui/core/Box';
// import { Line } from 'react-chartjs-2';
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);


// function ProcurementForecast() {

//     const [productName, setProductName] = useState("")
//     const [prediction, setPrediction] = useState([])
//     const [value, setValue] = useState();
//     const [series, setSeries] = useState();

//     // const labels = Utils.months({count: 7});

//     const onChangeSearchProduct = (e) => {
//         const productName = e.target.value;
//         setProductName(productName);
//     };

//     const generateForecast = () => {


//         axios.get('http://localhost:4010/lstm_predict?name=' + productName + '&nmonth=' + 3)
//             .then(function (response) {
//                 console.log(response.data);
//                 console.log(response.data.prediction[0]);
//                 setValue(response.data.prediction[0]);
//                 console.log(response.data.series);
//                 setSeries(response.data.series);
//                 setPrediction(response.data.prediction);

//                 if (response.data.prediction.length == 0) {
//                     alert("This Product is not Our System!!");
//                 }
//                 else {
//                     alert("Successfuly Product Forecating are generated!!");
//                 }


//                 // window.location.reload(false);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     };



//     return (
//         <div >
//             <NavAdmin />

//             <div >
//                 <div className='ProcurementHeader'>
//                     <h1 align="center" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", color: "coral", padding: "70px" }}>Forecast Procurement</h1>
//                 </div>

//                 <div className='ProcurementBody'>
//                     <div className="col-md-7">
//                         <div className="input-group mb-3" >
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Search Product Name"
//                                 value={productName}
//                                 onChange={onChangeSearchProduct}
//                             />
//                             <div className="input-group-append">
//                                 <button
//                                     className="btn btn-warning"
//                                     type="button"
//                                     onClick={() => generateForecast()}
//                                 >
//                                     Forecast
//                                 </button>
//                             </div>

//                         </div>
//                     </div>

//                     <div style={{ paddingTop: "10px", paddingBottom: "25px", color: "white" }}>
//                         Next Month {productName} Prediction: {value}
//                     </div>

//                     <div style={{ backgroundColor: "white" }}>
//                         <Line
//                             // labels = {Utils.months({count: 7})} [65, 59, 80, 81, 56, 55, 40]

//                             data={{
//                                 labels: ['2021-Jan', '2021-Feb', '2021-Mar', '2021-April', '2021-May', '2021-June', '2021-July', '2021-Aug', '2021-Sep', '2021-Oct', '2021-Nov', '2021-Dec'],
//                                 datasets: [
//                                     {
//                                         label: 'Sold measure',
//                                         data: series,
//                                         fill: false,
//                                         borderColor: 'rgb(75, 192, 192)',
//                                         // xAxisID: 'x',
//                                         // tension: 0.1,

//                                     },
//                                     {
//                                         label: 'Prediction',
//                                         //data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}]
//                                         data: [{ x: '2022-Jan', y: prediction[0] }, { x: '2022-Feb', y: prediction[1] }, { x: '2022-Mar', y: prediction[2] }],
//                                         fill: false,
//                                         borderColor: 'rgb(255,0,0)',
//                                         // xAxisID: 'x1',
//                                         // tension: 0.1,
//                                     }
//                                 ],

//                                 // datasets: [{
//                                 //     label: 'Prediction',
//                                 //     data: prediction,
//                                 //     fill: false,
//                                 //     borderColor: 'rgb(255,0,0)',
//                                 //     tension: 0.1,
//                                 //     // yAxisID: 'y-axis-2',
//                                 // }],


//                             }}


//                             width={200}
//                             height={300}
//                             options={{
//                                 maintainAspectRatio: false,

//                                 scales: {
//                                     x: {
//                                         display: true,
//                                         title: {
//                                             display: true,
//                                             text: 'Months'
//                                         },
//                                     },

//                                     y: {
//                                         type: 'linear',
//                                         display: true,
//                                         title: {
//                                             display: true,
//                                             text: 'Procurement'
//                                         },
//                                     }

//                                 },

//                                 plugins: {
//                                     responsive: true,
//                                     title: {
//                                         display: true,
//                                         text: 'Product Procurement',
//                                         font: {
//                                             size: 30
//                                         }
//                                     },
//                                     legend: {
//                                         // display: true,
//                                         position: 'top',
//                                         // labels: {
//                                         //     color: 'green',
//                                         //     font: {
//                                         //         size: 20
//                                         //     }
//                                         // }
//                                     },
//                                 }
//                             }
//                             }

//                         />
//                     </div>
//                 </div>

//             </div>

//             <div style={{ backgroundColor: "rgb(211,211,211)" }}>
//                 <Box pt={3}>
//                     <Copyright />
//                 </Box>
//             </div>
//         </div>
//     );
// }

// export default ProcurementForecast;  





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavAdmin from '../NavBar/navAdmin';
import Copyright from '../Footer/footer';
import Box from '@material-ui/core/Box';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


function ProcurementForecast() {

    const [productName, setProductName] = useState("")
    const [prediction, setPrediction] = useState([])
    const [value, setValue] = useState();
    const [series, setSeries] = useState();

    // const labels = Utils.months({count: 7});

    const onChangeSearchProduct = (e) => {
        const productName = e.target.value;
        setProductName(productName);
    };

    const generateForecast = () => {


        axios.get('http://localhost:4010/lstm_predict?name=' + productName + '&nmonth=' + 3)
            .then(function (response) {
                console.log(response.data);
                console.log(response.data.prediction[0]);
                setValue(response.data.prediction[0]);
                console.log(response.data.series);
                setSeries(response.data.series);
                setPrediction(response.data.prediction);

                if (response.data.prediction.length == 0) {
                    alert("This Product is not Our System!!");
                }
                else {
                    alert("Successfuly Product Forecating are generated!!");
                }


                // window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };



    return (
        <div >
            <NavAdmin />

            <div className='ProcurementHeader'>

                <div className='ProcurementBody'>
                    <h1 align="center" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", color: "coral" }}>Forecast Procurement</h1>
                    <div className="col-md-7" style={{paddingTop: '20px'}}>
                        <div className="input-group mb-3" >
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Product Name"
                                value={productName}
                                onChange={onChangeSearchProduct}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-warning"
                                    type="button"
                                    onClick={() => generateForecast()}
                                >
                                    Forecast
                                </button>
                            </div>

                        </div>
                    </div>

                    <div style={{paddingTop: "10px", paddingBottom: "10px", color: "white" }}>
                        Next Month {productName} Prediction: {value}
                    </div>

                    <div style={{ backgroundColor: "white" }}>
                        <Line
                            // labels = {Utils.months({count: 7})} [65, 59, 80, 81, 56, 55, 40]

                            data={{
                                labels: ['2021-Jan', '2021-Feb', '2021-Mar', '2021-April', '2021-May', '2021-June', '2021-July', '2021-Aug', '2021-Sep', '2021-Oct', '2021-Nov', '2021-Dec'],
                                datasets: [
                                    {
                                        label: 'Sold measure',
                                        data: series,
                                        fill: false,
                                        borderColor: 'rgb(75, 192, 192)',
                                        // xAxisID: 'x',
                                        // tension: 0.1,

                                    },
                                    {
                                        label: 'Prediction',
                                        //data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}]
                                        data: [{ x: '2022-Jan', y: prediction[0] }, { x: '2022-Feb', y: prediction[1] }, { x: '2022-Mar', y: prediction[2] }],
                                        fill: false,
                                        borderColor: 'rgb(255,0,0)',
                                        // xAxisID: 'x1',
                                        // tension: 0.1,
                                    }
                                ],

                                // datasets: [{
                                //     label: 'Prediction',
                                //     data: prediction,
                                //     fill: false,
                                //     borderColor: 'rgb(255,0,0)',
                                //     tension: 0.1,
                                //     // yAxisID: 'y-axis-2',
                                // }],


                            }}


                            width={200}
                            height={300}
                            options={{
                                maintainAspectRatio: false,

                                scales: {
                                    x: {
                                        display: true,
                                        title: {
                                            display: true,
                                            text: 'Months'
                                        },
                                    },

                                    y: {
                                        type: 'linear',
                                        display: true,
                                        title: {
                                            display: true,
                                            text: 'Procurement'
                                        },
                                    }

                                },

                                plugins: {
                                    responsive: true,
                                    title: {
                                        display: true,
                                        text: 'Product Procurement',
                                        font: {
                                            size: 30
                                        }
                                    },
                                    legend: {
                                        // display: true,
                                        position: 'top',
                                        // labels: {
                                        //     color: 'green',
                                        //     font: {
                                        //         size: 20
                                        //     }
                                        // }
                                    },
                                }
                            }
                            }

                        />
                    </div>
                </div>

            </div>

            <div style={{ backgroundColor: "rgb(211,211,211)" }}>
                <Box pt={3}>
                    <Copyright />
                </Box>
            </div>
        </div>
    );
}

export default ProcurementForecast;