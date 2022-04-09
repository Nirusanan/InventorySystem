import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Employee1 from './supEmployee.jpg';
import NavAdmin from '../NavBar/navAdmin';
import Copyright from '../Footer/footer';
import Box from '@material-ui/core/Box';


const EmployeeView = (props) => {

  const url = 'http://localhost:4000/view'

  const [data, setData] = useState([]);
  const [userValue, setUserValue] = useState({});


  // const handleChangeEmail = (event) => {
  //   setUserValue({ email: event.target.value });
  // }

  const onChange = (e) =>
    setUserValue({ ...userValue, [e.target.name]: e.target.value });


  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userValue);

    axios.post('http://localhost:4000/update', userValue)
      // .then(() => this.setState({ redirect: true }))
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

    const userdata = {
      id: user.Id,
      email: user.UserName,
      password: '',
      name: user.Name,
      address: user.Address,
      mobile: user.Mobile,
      age: user.Age
    };

    setUserValue(userdata);
  }





  const renderTable = () => {
    console.log(data);
    return data.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.Id}</td>
          <td>{user.UserName}</td>
          <td>{user.Name}</td>
          <td>{user.Address}</td>
          <td>{user.Mobile}</td>
          <td>{user.Age}</td>
          <td>{String(user.IsAdmin)}</td>
          <td>{user.CreatedOn}</td>

          <td>
            <button type="submit" onClick={() => handleDelete(user.Id, index)} className="btn btn-primary btn-block">Delete</button> &nbsp;

            <button type="submit" className="btn btn-primary btn-block" onClick={() => handleUpdate(user)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Edit Employee</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">

                    <form onSubmit={(e) => onSubmit(e)}>


                      <div class="mb-2 row">
                        <label class="col-sm-3 col-form-label">Email: </label>
                        <div class="col-sm-9">
                          <input type="text" name="email" value={userValue.email} onChange={(e) => onChange(e)} class="form-control" required />
                        </div>


                      </div>

                      <div class="mb-2 row">
                        <label class="col-sm-3 col-form-label"> Password: </label>
                        <div class="col-sm-9">
                          <input type="text" name="password" value={userValue.password} onChange={(e) => onChange(e)} class="form-control" required />
                        </div>
                      </div>

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
                          <input type="number" name="mobile" value={userValue.mobile} onChange={(e) => onChange(e)} className="form-control" required />
                        </div>
                      </div>

                      <div class="mb-2 row">
                        <label class="col-sm-3 col-form-label"> Age: </label>
                        <div class="col-sm-9">
                          <input type="number" name="age" value={userValue.age} onChange={(e) => onChange(e)} className="form-control" required />
                        </div>
                      </div>


                      <button type="submit" className="btn btn-primary btn-block"  >Update</button>
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
    <div>
      <NavAdmin />

      <div>

        <div class="clearfix employee-body">
          <img src={Employee1} class="col-md-7 float-md-start mb-6 ms-md-6" alt="..." width={470} />

          <h1 id="title" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", color: "coral", paddingTop: "70px" }}>Employee</h1>

          <h4 style={{textShadow: "2px 2px 5px red", paddingTop: "30px", paddingBottom: "40px"}}> Happy employees provide true business value </h4>

          <p class="text-info bg-dark" style={{padding: "10px"}}>
          Day after day, supermarket employees keep communities going. They define the term "community service."
          </p>

        </div>

        <div class="container-fluid bg-info" style={{ paddingTop: "30px", paddingBottom: "20px" }}>
          <table id="users" class="table table-success table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>UserName</th>
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



          <button type="submit" onClick={() => props.history.push("/employeeadd")} className="btn btn-primary btn-block"> Add</button>
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

export default EmployeeView;

