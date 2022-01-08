import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const PersonView = () => {
  const url = 'http://localhost:4000/view'

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(url).then(json => setData(json.data))

  }, [])

  const renderTable = () => {
    console.log(data);
    return data.map(user => {
      return (
        <tr>
          <td>{user.Id}</td>
          <td>{user.UserName}</td>
          <td>{user.Password}</td>
          <td>{user.Name}</td>
          <td>{user.Address}</td>
          <td>{user.Mobile}</td>
          <td>{user.Age}</td>
          <td>{user.IsAdmin}</td>
          <td>{user.CreatedOn}</td>

        </tr>
      )
    })
  }

  return (
    <div>
      <h1 id="title">API Table</h1>
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
        <tbody>{renderTable()}</tbody>
      </table>


    </div>
  )
}

export default PersonView;