import React from 'react';
import axios from 'axios';
import NavAdmin from '../NavBar/navAdmin';
import { useFormik } from 'formik';
import * as yup from 'yup';

function EmployeeAdd(props) {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      address: '',
      mobile: '',
      age: '',
      admin: '',
      createdOn: ''
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string()
        .required("password is a required field")
        .strict()
        .trim()
        .min(6, "Minium 6 characters required")
        .max(8, "Maxium 8 characters"),
      name: yup.string().required(),
      address: yup.string()
        .required("address is a required field")
        .max(10, "Maxium 10 characters"),
      mobile: yup.string()
        .required("Mobile Number is required")
        .max(9, "Maximum mobile number is Ten"),
      admin: yup.number().max(1).required()

    }),
    onSubmit: (userInputData) => {
      console.log(userInputData);
      axios.post('http://localhost:4000/insert', userInputData)
        .then(function (response) {
          console.log(response);
          alert("Successfuly inserted!!");
          props.history.push("/employeeview");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  })



  return (
    <div className='Employee'>
      <NavAdmin />

      <div className="auth-wrapper">
        <div className="auth-inner">
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <h3> Add Employee </h3>

            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label">Email: </label>
              <div class="col-sm-9">
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email ?
                  <div className="text-danger">{formik.errors.email}</div>
                  : null
                }
              </div>
            </div>

            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label">Password: </label>
              <div class="col-sm-9">
                <input
                  className="form-control"
                  type="text"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password ?
                  <div className="text-danger">{formik.errors.password}</div>
                  : null
                }
              </div>
            </div>

            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label">Name: </label>
              <div class="col-sm-9">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name ?
                  <div className="text-danger">{formik.errors.name}</div>
                  : null
                }
              </div>
            </div>


            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label">Address: </label>
              <div class="col-sm-9">
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                {formik.errors.address ?
                  <div className="text-danger">{formik.errors.address}</div>
                  : null
                }
              </div>
            </div>

            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label">Mobile: </label>
              <div class="col-sm-9">
                <input
                  className="form-control"
                  type="number"
                  name="mobile"
                  onChange={formik.handleChange}
                  value={formik.values.mobile}
                />
                {formik.errors.mobile ?
                  <div className="text-danger">{formik.errors.mobile}</div>
                  : null
                }
              </div>
            </div>

            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label">Age: </label>
              <div class="col-sm-9">
                <input
                  className="form-control"
                  type="number"
                  name="age"
                  onChange={formik.handleChange}
                  value={formik.values.age}
                />
              </div>
            </div>

            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label">Admin: </label>
              <div class="col-sm-9">
                <input
                  className="form-control"
                  type="number"
                  name="admin"
                  onChange={formik.handleChange}
                  value={formik.values.admin}
                />
                {formik.errors.admin ?
                  <div className="text-danger">{formik.errors.admin}</div>
                  : null
                }
              </div>
            </div>

            <div class="mb-2 row">
              <label class="col-sm-3 col-form-label">CreatedOn: </label>
              <div class="col-sm-9">
                <input
                  className="form-control"
                  type="date"
                  name="createdOn"
                  onChange={formik.handleChange}
                  value={formik.values.createdOn}
                />
                {formik.errors.createdOn ?
                  <div className="text-danger">{formik.errors.createdOn}</div>
                  : null
                }
              </div>
            </div>

            <button className="btn btn-primary">Submit</button>

          </form>
        </div>
      </div>

    </div>
  );
}

export default EmployeeAdd;