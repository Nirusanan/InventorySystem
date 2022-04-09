import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavEmployee from '../NavBar/navEmployee';
import Copyright from '../Footer/footer';
import Box from '@material-ui/core/Box';


const CustomerView = (props) => {

    const url = 'http://localhost:4000/customerView'

    const [data, setData] = useState([]);
    const [userValue, setUserValue] = useState({});

    const onChange = (e) =>
        setUserValue({ ...userValue, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(userValue);

        axios.post('http://localhost:4000/customerUpdate', userValue)
            .then(function (response) {
                console.log(response);
                alert("Successfully Updated!!");
                window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        axios.get(url).then(json => setData(json.data))

    }, [])


    const deleteRow = (index) => {
        console.log(index);
        var updatedRows = [...data]

        updatedRows.splice(index, 1);
        setData(updatedRows);
    }


    const handleDelete = (rowId, index) => {
        // event.preventDefault();
        console.log(rowId);

        axios.post('http://localhost:4000/customerDelete', { "id": rowId })
            .then(function (response) {
                console.log(response);
                deleteRow(index);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const handleUpdate = (user) => {

        const userdata = {
            id: user.Id,
            name: user.Name,
            address: user.City,
            mobile: user.MobileNumber,
            createdOn: user.CreatedOn
        };
        setUserValue(userdata);
    }





    const renderTable = () => {
        console.log(data);
        return data.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.Id}</td>
                    <td>{user.Name}</td>
                    <td>{user.City}</td>
                    <td>{user.MobileNumber}</td>
                    {/* <td>{user.CreatedOn}</td> */}
                    <td>{user.Segment}</td>

                    <td>
                        <button type="submit" onClick={() => handleDelete(user.Id, index)} className="btn btn-primary btn-block">Delete</button> &nbsp;

                        <button type="submit" className="btn btn-primary btn-block" onClick={() => handleUpdate(user)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">Edit Customer</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">

                                        <form onSubmit={(e) => onSubmit(e)}>

                                            <div class="mb-2 row">
                                                <label class="col-sm-3 col-form-label"> Name: </label>
                                                <div class="col-sm-9">
                                                    <input type="text" name="name" value={userValue.name} onChange={(e) => onChange(e)} className="form-control" required />
                                                </div>
                                            </div>

                                            <div class="mb-2 row">
                                                <label class="col-sm-3 col-form-label"> Address: </label>
                                                <div class="col-sm-9">
                                                    <input type="text" name="address" value={userValue.address} onChange={(e) => onChange(e)} className="form-control" required />
                                                </div>
                                            </div>

                                            <div class="mb-2 row">
                                                <label class="col-sm-3 col-form-label"> Mobile: </label>
                                                <div class="col-sm-9">
                                                    <input type="text" name="mobile" value={userValue.mobile} onChange={(e) => onChange(e)} className="form-control" required />
                                                </div>
                                            </div>

                                            <div class="mb-2 row">
                                                <label class="col-sm-3 col-form-label"> CreatedOn: </label>
                                                <div class="col-sm-9">
                                                    <input type="date" name="createdOn" value={userValue.createdOn} onChange={(e) => onChange(e)} className="form-control" required />
                                                </div>
                                            </div>

                                            <button type="submit" className="btn btn-primary btn-block" >Update</button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </td>

                </tr>
            )
        })
    }


    return (
        <div >
            <NavEmployee />

            <div style={{ marginTop: "113px" }}>
                {/* <div class="Header-Body">
                    <h1 id="title" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", color: "coral" }}>Customer</h1>
                </div> */}

                <div className='CustomerView'>
                    <h1 id="title" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", color: "coral", textAlign: "center" }} >Customer</h1>

                    <h5 class="text-info" style={{ padding: "10px", background: "purple", marginTop: "340px", marginLeft: "40%", marginRight: "7%", marginBottom: "10px" }}>
                        Maintain the customer details to identify current status of supermarket
                    </h5>

                    {/* <h4 id="title" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", color: "coral", background: "purple", border: "10px black", backgroundClip: "content-box", textAlign: "center" }}>Customer Loyalty</h4> */}
                </div>

                <div class="container-fluid bg-info" style={{ paddingTop: "30px", paddingBottom: "20px" }}>
                    <table id="users" class="table table-success table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Mobile</th>
                                {/* <th>CreatedOn</th> */}
                                <th>Segment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody >{renderTable()}</tbody>
                    </table>

                    <button type="submit" onClick={() => props.history.push("/customeradd")} className="btn btn-primary btn-block"> Add</button>
                </div>
            </div>
            <div style={{ backgroundColor: "rgb(211,211,211)" }}>
                <Box pt={3}>
                    <Copyright />
                </Box>
            </div>


        </div>
    )
}
export default CustomerView;
