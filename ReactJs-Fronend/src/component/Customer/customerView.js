import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import NavBar from '../Dashboard/navBar';
import NavEmployee from '../NavBar/navEmployee';



const CustomerView = (props) => {


    const [data, setData] = useState([]);

    const url = 'http://localhost:4000/customerView'


    useEffect(() => {
        axios.get(url).then(json => setData(json.data))

    }, [])




    const deleteRow = (index) => {

        console.log(index);

        var updatedRows = [...data]
        console.log(updatedRows)

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
        console.log(user);

        props.history.push("/customeredit", user);
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
                    <td>{user.CreatedOn}</td>
                    <td>{user.Segment}</td>

                    <td>
                        <button type="submit" onClick={() => handleDelete(user.Id, index)} className="btn btn-primary btn-block">Delete</button> &nbsp;
                        <button type="submit" onClick={() => handleUpdate(user)} className="btn btn-primary btn-block">Edit</button>
                    </td>

                </tr>
            )
        })
    }




    return (
        <div >
            <NavEmployee />
            <div class="container-fluid">
                <h1 id="title">Customer Details</h1>
                <table id="users" class="table table-success table-striped ">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Mobile</th>
                            <th>CreatedOn</th>
                            <th>Segment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >{renderTable()}</tbody>
                </table>

                <button type="submit" onClick={() => props.history.push("/customeradd")} className="btn btn-primary btn-block"> Add</button>
            </div>
        </div>
    )
}

export default CustomerView;