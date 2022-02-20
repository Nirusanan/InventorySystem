import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavAdmin from '../NavBar/navAdmin';



const EmployeeView = (props) => {

  const url = 'http://localhost:4000/view'

  const [data, setData] = useState([]);

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

    axios.post('http://localhost:4000/delete', { "id": rowId })
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
    
    props.history.push("/employeeedit", user);
  }

  



  const renderTable = () => {
    console.log(data);
    return data.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.Id}</td>
          <td>{user.UserName}</td>
          <td>{user.Password}</td>
          <td>{user.Name}</td>
          <td>{user.Address}</td>
          <td>{user.Mobile}</td>
          <td>{user.Age}</td>
          <td>{String(user.IsAdmin)}</td>
          <td>{user.CreatedOn}</td>

          <td>
            <button type="submit" onClick={() => handleDelete(user.Id, index)} className="btn btn-primary btn-block">Delete</button>  
            <br/> <br/>
            <button type="submit" onClick={() => handleUpdate(user)} className="btn btn-primary btn-block">Edit</button>
          </td>

        </tr>
      )
    })
  }

  


  return (
    <div>
      <NavAdmin />
      <h1 id="title" >Employee Details</h1>
      <table id="users" class="table table-success table-striped ">
        <thead>
          <tr>
            <th>Id</th>
            <th>UserName</th>
            <th>Password</th>
            <th>Name</th>
            <th>Address</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>IsAdmin</th>
            <th>CreatedOn</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody >{renderTable()}</tbody>
      </table>

      <button type="submit" onClick={()=> props.history.push("/employeeadd")} className="btn btn-primary btn-block"> Add</button>

    </div>
  )
}

export default EmployeeView;
