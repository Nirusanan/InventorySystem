import React from 'react';
import axios from 'axios';
import NavEmployee from '../NavBar/navEmployee';
import Copyright from '../Footer/footer';
import Box from '@material-ui/core/Box';
import { useFormik } from 'formik';
import * as yup from 'yup';

function CustomerAdd(props) {

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      mobile: '',
      createdOn: '',
      segment: ''
    },
    validationSchema: yup.object({
      name: yup.string()
        .required("Name is required")
        .strict()
        .trim()
        .min(4, "Minium 4 characters required"),
      address: yup.string()
        .required("Address is required")
        .max(10, "Maxium 10 characters"),
      mobile: yup.string()
        .required("Mobile Number is required")
        .max(9, "Maximum mobile number is Ten")





    }),
    onSubmit: (userInputData) => {
      console.log(userInputData);
      axios.post('http://localhost:4000/customerInsert', userInputData)
        .then(function (response) {
          console.log(response);
          alert("Successfuly inserted!!");
          props.history.push("/customerview");
        })
        .catch(function (error) {
          console.log(error);
        });
    }



  })


  return (
    <div className='Customer'>
      <NavEmployee />

      <div style={{ marginTop: "114px" }}>
        <div class="Header-Body container-fluid">
          <h1 id="title" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", color: "coral" }}>Customer</h1>
        </div>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <h3> Add Customer</h3>

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

              <div class="mb-2 row">
                <label class="col-sm-3 col-form-label">Segment: </label>
                <div class="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    name="segment"
                    placeholder="Null"
                    onChange={formik.handleChange}
                    value={formik.values.segment}
                  />
                  {formik.errors.segment ?
                    <div className="text-danger">{formik.errors.segment}</div>
                    : null
                  }
                </div>
              </div>

              <button className="btn btn-primary">Submit</button>

            </form>
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

export default CustomerAdd;