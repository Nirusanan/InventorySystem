import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavEmployee from '../NavBar/navEmployee';


const ProductView = (props) => {

    const [data, setData] = useState([]);

    const url = 'http://localhost:4000/productView'



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

        axios.post('http://localhost:4000/productDelete', { "id": rowId })
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

        props.history.push("/productedit", user);
    }





    const renderTable = () => {
        console.log(data);
        return data.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.Id}</td>
                    <td>{user.Description}</td>
                    <td>{user.UnitPrice}</td>

                    <td>
                        <button type="submit" onClick={() => handleDelete(user.Id, index)} className="btn btn-primary btn-block">Delete</button> &nbsp;
                        <button type="submit" onClick={() => handleUpdate(user)} className="btn btn-primary btn-block">Edit</button>
                    </td>

                </tr>
            )
        })
    }




    return (
        <div>
            <NavEmployee />
            <h1 id="title" align="center">Product Details</h1>
            <table id="users" class="table table-success table-striped ">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Unit Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >{renderTable()}</tbody>
            </table>

            <button type="submit" onClick={() => props.history.push("/productadd")} className="btn btn-primary btn-block"> Add</button>

        </div>
    )
}

export default ProductView;