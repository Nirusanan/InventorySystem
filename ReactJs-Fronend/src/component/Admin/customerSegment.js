import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavAdmin from '../NavBar/navAdmin';
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
            <div>
                <NavAdmin />
                <h1 id="title">Customer Loyalty</h1>
                <table id="users" class="table table-success table-striped ">
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
            <div>
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
    );
}

export default CustomerSegment;


