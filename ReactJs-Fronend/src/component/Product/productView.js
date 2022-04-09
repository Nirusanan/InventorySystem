// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NavEmployee from '../NavBar/navEmployee';


// const ProductView = (props) => {

//     const [data, setData] = useState([]);

//     const url = 'http://localhost:4000/productView'



//     useEffect(() => {
//         axios.get(url).then(json => setData(json.data))

//     }, [])




//     const deleteRow = (index) => {

//         console.log(index);

//         var updatedRows = [...data]
//         console.log(updatedRows)

//         updatedRows.splice(index, 1);
//         setData(updatedRows);



//     }

//     const handleDelete = (rowId, index) => {
//         // event.preventDefault();


//         console.log(rowId);

//         axios.post('http://localhost:4000/productDelete', { "id": rowId })
//             .then(function (response) {
//                 console.log(response);

//                 deleteRow(index);

//             })
//             .catch(function (error) {
//                 console.log(error);
//             });

//     }

//     const handleUpdate = (user) => {
//         console.log(user);

//         props.history.push("/productedit", user);
//     }





//     const renderTable = () => {
//         console.log(data);
//         return data.map((user, index) => {
//             return (
//                 <tr key={index}>
//                     <td>{user.Id}</td>
//                     <td>{user.Description}</td>
//                     <td>{user.UnitPrice}</td>

//                     <td>
//                         <button type="submit" onClick={() => handleDelete(user.Id, index)} className="btn btn-primary btn-block">Delete</button> &nbsp;
//                         <button type="submit" onClick={() => handleUpdate(user)} className="btn btn-primary btn-block">Edit</button>
//                     </td>

//                 </tr>
//             )
//         })
//     }




//     return (
//         <div>
//             <NavEmployee />
//             <h1 id="title" align="center">Product Details</h1>
//             <table id="users" class="table table-success table-hover">
//                 <thead>
//                     <tr>
//                         <th>Id</th>
//                         <th>Product Name</th>
//                         <th>Unit Price</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody >{renderTable()}</tbody>
//             </table>

//             <button type="submit" onClick={() => props.history.push("/productadd")} className="btn btn-primary btn-block"> Add</button>

//         </div>
//     )
// }

// export default ProductView;  


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavEmployee from '../NavBar/navEmployee';
import Copyright from '../Footer/footer';
import Box from '@material-ui/core/Box';
import fruit from '../../assets/fruits.jpg';
import vegitable from '../../assets/vegitables.jpg';
import beverage from '../../assets/beverages.jpg';
import bakery from '../../assets/bakery.jpg';
import gerocery from '../../assets/product.jpg'


const ProductView = (props) => {

    const url = 'http://localhost:4000/productView'

    const [data, setData] = useState([]);
    const [userValue, setUserValue] = useState({});


    const onChange = (e) =>
        setUserValue({ ...userValue, [e.target.name]: e.target.value });


    const onSubmit = (e) => {
        e.preventDefault();
        console.log(userValue);

        axios.post('http://localhost:4000/productUpdate', userValue)
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

        const productdata = {
            id: user.Id,
            name: user.Description,
            price: user.UnitPrice
        };
        setUserValue(productdata);
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
                                                <label class="col-sm-3 col-form-label"> Product Name: </label>
                                                <div class="col-sm-9">
                                                    <input type="text" name="name" value={userValue.name} onChange={(e) => onChange(e)} className="form-control" required />
                                                </div>
                                            </div>

                                            <div class="mb-2 row">
                                                <label class="col-sm-3 col-form-label"> Price: </label>
                                                <div class="col-sm-9">
                                                    <input type="number" name="price" value={userValue.price} onChange={(e) => onChange(e)} className="form-control" required />
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
            <NavEmployee />

            <div style={{ marginTop: "113px" }}>
                <div className='ProductView'>
                    <h1 id="title" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", color: "coral", paddingTop: "50px", marginLeft: "70%", marginRight: "7%" }}>WE SALES <br />BEST QUALITY PRODUCTS </h1>
                    <h4 style={{ textShadow: "2px 2px 5px red", marginTop: "150px", marginLeft: "40%", marginRight: "7%", paddingBottom: "20px" }}>Grocery Items Here</h4>
                </div>

                <div class="container-fluid bg-info" style={{ paddingTop: "30px", paddingBottom: "10px" }}>
                    <table id="users" class="table table-success table-hover">
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

                <div className="product-category">
                    <h4>Product Category</h4>
                    <div class="container" style={{ paddingTop: "40px" }}>
                        <div class="row row-cols-2 row-cols-md-5 g-4">
                            <div class="col">
                                <div class="img-hover-zoom">
                                    <img src={gerocery} alt='..' width={200} height={200} style={{ borderRadius: "50%" }} />
                                </div>
                                <p style={{ textAlign: "center", color: "green" }}>Groceries</p>
                            </div>
                            <div class="col">
                                <div class="img-hover-zoom">
                                    <img src={vegitable} alt='..' width={200} height={200} style={{ borderRadius: "50%" }} />
                                </div>
                                <p style={{ textAlign: "center", color: "green" }}>Fresh Vegitables</p>
                            </div>
                            <div class="col">
                                <div class="img-hover-zoom">
                                    <img src={fruit} alt='..' width={200} height={200} style={{ borderRadius: "50%" }} />
                                </div>
                                <p style={{ textAlign: "center", color: "green" }}>Fresh Fruits</p>
                            </div>
                            <div class="col">
                                <div class="img-hover-zoom">
                                    <img src={bakery} alt='..' width={200} height={200} style={{ borderRadius: "50%" }} />
                                </div>
                                <p style={{ textAlign: "center", color: "green" }}>Bakery Items</p>
                            </div>
                            <div class="col">
                                <div class="img-hover-zoom">
                                    <img src={beverage} alt='..' width={200} height={200} style={{ borderRadius: "50%" }} />
                                </div>
                                <p style={{ textAlign: "center", color: "green" }}>Beverage</p>
                            </div>
                        </div>
                    </div>
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

export default ProductView;