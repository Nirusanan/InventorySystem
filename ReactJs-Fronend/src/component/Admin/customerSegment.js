import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavAdmin from '../NavBar/navAdmin';
import Copyright from '../Footer/footer';
import Box from '@material-ui/core/Box';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function CustomerSegment() {

    const [data, setData] = useState([]);

    const [segment, setSegment] = useState({});

    const url = 'http://localhost:4000/segmentView'


    useEffect(() => {
        axios.get(url).then(json => setData(json.data))

    }, [])

    const generateSegment = () => {
        axios.get('http://localhost:4010/rfm_generate')
            .then(function (response) {
                console.log(response.data);
                setSegment(response.data);
                alert("Successfuly Customer segments are generated!!");
                // window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const renderTable = () => {
        console.log(segment.H);
        return data.map((user) => {
            return (
                <tr>
                    <td>{user.Id}</td>
                    <td>{user.Name}</td>
                    <td>{user.Segment}</td>
                </tr>
            )
        })
    }

    return (
        <div>
            <NavAdmin />

            <div>
                {/* <div class="Header-Body">
                    <h1 id="title" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", color: "coral" }}>Customer Loyalty</h1>
                </div> */}

                <div className='segment-img'>
                    <h1 id="title" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", color: "coral", background: "purple", border: "10px black", backgroundClip: "content-box", textAlign: "center" }}>Customer Loyalty</h1>

                    {/* <div style={{ background: "lightblue", border: "10px black", backgroundClip: "content-box", paddingTop: "200px", paddingRight: "700px", paddingLeft: "20px" }}>
                        <p style={{ textShadow: "0 0 3px #FF0000" }}>Analyze Customer Segment to Increase Profit</p>
                    </div> */}

                    <h3 style={{ textShadow: "2px 2px 4px #000000", color: "white", paddingTop: "20px", paddingLeft: "20px"}}> Analyze Customer Segment <br/> To Increase Profit</h3>

                    <p style={{ textShadow: "0 0 3px #FF0000",paddingTop: "70px", paddingLeft: "20px" }}>Supermarkets maintain <br/>75% loyal customers</p>

                </div>

                <div class="container-fluid bg-info" style={{ paddingTop: "30px", paddingBottom: "20px" }}>
                    <table id="users" class="table table-success table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Loyalty</th>
                            </tr>
                        </thead>
                        <tbody >{renderTable()}</tbody>
                    </table>

                    <button type="submit" onClick={() => generateSegment()} className="btn btn-primary btn-block"> Generate Segment</button>
                </div>

                <div style={{ paddingTop: "20px", paddingBottom: "30px", backgroundColor: "rgb(255, 153, 128)" }}>
                    <Pie
                        data={{
                            labels: ['High', 'Medium', 'Low'],
                            datasets: [{
                                label: '# of customers',
                                data: [segment.H, segment.M, segment.L],
                                backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 205, 86)'
                                ],
                                borderWidth: 3,
                                // hoverOffset: 4
                            }],


                        }}

                        width={300}
                        height={300}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Number of Loyalty Customers',
                                    font: {
                                        size: 30
                                    }
                                },
                                legend: {
                                    display: true,
                                    position: 'right',
                                    labels: {
                                        color: 'green',
                                        font: {
                                            size: 20
                                        }
                                    }
                                },
                            }
                        }}
                    />
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

export default CustomerSegment;


