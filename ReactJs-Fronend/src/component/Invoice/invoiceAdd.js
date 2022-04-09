// import React, { useState } from "react";
// import axios from 'axios';
// import NavEmployee from "../NavBar/navEmployee";
// import Copyright from '../Footer/footer';
// import Box from '@material-ui/core/Box';

// function InvoiceAdd(props) {
//     const [rows, setRows] = useState([]);
//     const [searchMobile, setSearchMobile] = useState("");
//     const [name, setName] = useState("");
//     const [customerId, setCustomerId] = useState("");

//     const [searchProduct, setSearchProduct] = useState("");
//     const [productId, setProductId] = useState("");




//     const onChangeSearchMobile = (e) => {
//         const searchMobile = e.target.value;
//         setSearchMobile(searchMobile);
//     };



//     const handleChange = item => e => {
//         const { name, value } = e.target;


//         let items = rows.map(row => {
//             if (row.id === item.id) {
//                 row[name] = value;


//                 const searchProduct = item.column_1;
//                 setSearchProduct(searchProduct);
//                 console.log(item.column_2);
//                 console.log(item.column_4);

//             }

//             return row;
//         });
//         setRows(items);
//         console.log(rows);
//     };



//     const findByMobile = () => {
//         axios.post('http://localhost:4000/customerName', { "mobile": searchMobile })
//             .then(function (response) {

//                 console.log(response.data);
//                 console.log(response.data[0]);

//                 if (response.data[0] == null) {
//                     alert("This customer is not our system.Please add this customer");
//                 }
//                 else {
//                     setName(response.data[0].Name);
//                     setCustomerId(response.data[0].Id);
//                 }


//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     };


//     const findPrice = (item) => {

//         axios.post('http://localhost:4000/productName', { "productName": searchProduct })
//             .then(function (response) {

//                 console.log(response.data);
//                 console.log(response.data[0]);

//                 if (response.data[0] == null) {
//                     alert("Invalid product name");
//                 }
//                 else {

//                     item.column_2 = response.data[0].UnitPrice;
//                     setProductId(response.data[0].Id);
//                     item.column_4 = response.data[0].Id;
//                 }


//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     };



//     const handleAddRow = () => {
//         let item = {
//             id: rows.length + 1,
//             column_1: "",
//             column_2: "",
//             column_3: "",
//             column_4: ""
//         };
//         setRows([...rows, item]);
//     };



//     const submitInvoice = () => {
//         const da = new Date();


//         rows.forEach(row => {
//             console.log(row);

//             const user = {
//                 productId: row.column_4,
//                 customerId: customerId,
//                 quantity: row.column_3,
//                 price: row.column_2,
//                 date: da
//             };
//             console.log(user);

//             axios.post('http://localhost:4000/invoiceInsert', user)
//                 .then(() =>
//                     //   alert("Successful insert"),
//                     //   window.location.reload(false) )
//                     console.log("Successful insert"))


//                 .catch(function (error) {
//                     console.log(error);
//                 });
//         });
//         alert("Successful insert");



//     };




//     const renderTable = () => {


//         return rows.map((item) => {
//             return (
//                 <tr id="addr">
//                     <td class="col-sm-3">
//                         <input
//                             type="text"
//                             name="column_1"
//                             class="form-control"
//                             // value={searchProduct}
//                             value={item.column_1}
//                             // onChange={onChangeSearchProduct} 
//                             onChange={handleChange(item)}
//                         />
//                     </td>
//                     <td class="col-sm-2">
//                         <input
//                             type="text"
//                             name="column_2"
//                             class="form-control"
//                             value={item.column_2}
//                             onChange={handleChange(item)}
//                         />
//                     </td>
//                     <td class="col-sm-1">
//                         <input type="text"
//                             name="column_3"
//                             class="form-control"
//                             value={item.column_3}
//                             onChange={handleChange(item)}
//                         />
//                     </td>


//                     <td >
//                         <button type="submit" className="btn btn-primary btn-block" onClick={() => findPrice(item)}>Price</button> &nbsp;

//                     </td>



//                 </tr>
//             )
//         })
//     }



//     return (
//         <div>
//             <NavEmployee />

//             <div>
//                 <div class="Header-Body">
//                     <h1 id="title" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", color: "coral" }}>Invoice</h1>
//                 </div>

//                 <div class="container-fluid bg-info" style={{ paddingTop: "30px", paddingBottom: "40px", paddingLeft: "" }}>
//                     {/* <div className="auth-wrapper"> */}
//                     <div className="invoice-inner">
//                         <div className="col-md-7">
//                             <div className="input-group mb-3">
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Search by Mobile Number"
//                                     value={searchMobile}
//                                     onChange={onChangeSearchMobile}
//                                 />
//                                 <div className="input-group-append">
//                                     <button
//                                         className="btn btn-warning"
//                                         type="button"
//                                         onClick={() => findByMobile()}
//                                     >
//                                         Search
//                                     </button>
//                                 </div>

//                             </div>

//                             <div class="mb-4 row">
//                                 <div class="col-md-4">
//                                     <label for="inputCity" class="form-label">Customer Name</label>
//                                     <input type="text" value={name} name="name" class="form-control" id="inputCity" />
//                                 </div>

//                                 <div class="col-md-2">
//                                     <label for="inputCity" class="form-label">Id</label>
//                                     <input type="text" value={customerId} name="id" class="form-control" id="inputCity" />
//                                 </div>


//                             </div>
//                         </div>



//                         <table id="users" class="table table-success table-striped">
//                             <thead>
//                                 <tr align="center">
//                                     <th >Product Name</th>
//                                     <th>Unit Price</th>
//                                     <th>Quantity</th>
//                                     <th></th>
//                                 </tr>
//                             </thead>

//                             {rows.length !== 0 && (
//                                 <tbody >
//                                     {renderTable()}

//                                 </tbody>
//                             )}

//                         </table>
//                         <div>

//                             <button type="submit" className="btn btn-danger" onClick={() => handleAddRow()}>Add Product</button> &nbsp;
//                             <button type="submit" className="btn btn-primary btn-block" onClick={() => submitInvoice()}>Submit</button>
//                         </div>



//                     </div>

//                     {/* </div> */}
//                 </div>
//             </div>
//             <div style={{ backgroundColor: "rgb(211,211,211)" }}>
//                 <Box pt={4}>
//                     <Copyright />
//                 </Box>
//             </div>
//         </div>
//     );
// }

// export default InvoiceAdd;    




import React, { useState } from "react";
import axios from 'axios';
import NavEmployee from "../NavBar/navEmployee";
import FirstInvoice from './invoice4.png';
import SecondInvoice from './invoice2.jpg';
import ThirdInvoice from './invoice.jpg';
import Copyright from '../Footer/footer';
import Box from '@material-ui/core/Box';

function InvoiceAdd(props) {
    const [rows, setRows] = useState([]);
    const [searchMobile, setSearchMobile] = useState("");
    const [name, setName] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [segment, setSegment] = useState("");

    const [searchProduct, setSearchProduct] = useState("");
    const [productId, setProductId] = useState("");
    const [total, setTotal] = useState("");

    const [offer, setOffer] = useState("");
    const [payment, setPayment] = useState("");
    const [predictItems, setPredictItems] = useState("");


    const onChangeSearchMobile = (e) => {
        const searchMobile = e.target.value;
        setSearchMobile(searchMobile);
    };



    const handleChange = item => e => {
        const { name, value } = e.target;

        let items = rows.map(row => {
            if (row.id === item.id) {
                row[name] = value;

                const searchProduct = item.column_1;
                setSearchProduct(searchProduct);
                console.log(item.column_2);
                console.log(item.column_4);
            }
            return row;
        });
        setRows(items);
        console.log(rows);
    };



    const findByMobile = () => {
        axios.post('http://localhost:4000/customerName', { "mobile": searchMobile })
            .then(function (response) {

                console.log(response.data);
                console.log(response.data[0]);

                if (response.data[0] == null) {
                    alert("This customer is not our system.Please add this customer");
                }
                else {
                    setName(response.data[0].Name);
                    setCustomerId(response.data[0].Id);
                    setSegment(response.data[0].Segment);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    const handleAddRow = () => {
        let item = {
            id: rows.length + 1,
            column_1: "",
            column_2: "",
            column_3: "",
            column_4: ""
        };
        setRows([...rows, item]);
    };


    const findPrice = (item) => {

        axios.post('http://localhost:4000/productName', { "productName": searchProduct })
            .then(function (response) {

                console.log(response.data);
                console.log(response.data[0]);

                if (response.data[0] == null) {
                    alert("Invalid product name");
                }
                else {

                    item.column_2 = response.data[0].UnitPrice;
                    setProductId(response.data[0].Id);
                    item.column_4 = response.data[0].Id;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };



    const productSuggestion = () => {
        console.log("Suggestion");
        console.log(rows.length);
        var productItem = [];

        rows.forEach(row => {
            productItem.push(row.column_4);

        });
        console.log(productItem);
        console.log(productItem.toString());


        axios.get('http://localhost:4010/reco_product?pitems=' + productItem.toString())
            .then(function (response) {
                console.log(response.data['Peridict Products']);
                setPredictItems(response.data['Peridict Products']);
                console.log(predictItems);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const offerCalculation = (cost) => {
        console.log(segment);
        console.log(typeof (segment));
        console.log(cost);
        var offerAmount = 0;

        if (segment.match('H')) {
            console.log("High");
            offerAmount = cost * 0.2;
        }
        else if (segment.match('M')) {
            console.log("Medium");
            offerAmount = cost * 0.1;
        }
        else if (segment.match('L')) {
            console.log("Low");
            offerAmount = cost * 0.05;
        }
        else {
            console.log("No segment");
        }
        setPayment(cost - offerAmount);

        setOffer(offerAmount);
    }



    const submitInvoice = () => {
        const da = new Date();
        console.log(da);
        var cost = 0;

        rows.forEach(row => {
            console.log(row);

            const user = {
                productId: row.column_4,
                customerId: customerId,
                quantity: row.column_3,
                price: row.column_2,
                date: da
            };
            cost = cost + row.column_3 * row.column_2;
            console.log(cost);

            console.log(user);

            axios.post('http://localhost:4000/invoiceInsert', user)
                .then(() =>
                    //   alert("Successful insert"),
                    //   window.location.reload(false) )
                    console.log("Successful insert"))


                .catch(function (error) {
                    console.log(error);
                });
        });
        setTotal(cost);
        console.log(cost);
        console.log("Alert mesg");
        alert("Successful insert");
        console.log("go");
        offerCalculation(cost);

    };




    const renderTable = () => {

        return rows.map((item) => {
            return (
                <tr id="addr">
                    <td class="col-sm-3">
                        <input
                            type="text"
                            name="column_1"
                            class="form-control"
                            value={item.column_1}
                            onChange={handleChange(item)}
                            onBlur={(e) => {
                                findPrice(item);
                            }}

                        />
                    </td>
                    <td class="col-sm-2">
                        <input
                            type="text"
                            name="column_2"
                            class="form-control"
                            value={item.column_2}
                            autoComplete="off"
                        />
                    </td>
                    <td class="col-sm-1">
                        <input type="text"
                            name="column_3"
                            class="form-control"
                            value={item.column_3}
                            onChange={handleChange(item)}
                        />
                    </td>

                    <td class="col-sm-1"></td>

                </tr>
            )
        })
    }



    return (
        <div>
            <NavEmployee />

            <div style={{ marginTop: "113px" }}>

                <div className='InvoiceView'>
                    <h1 id="title" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", color: "coral", paddingTop: "280px", marginLeft: "30%", marginRight: "30%" }}>SPAS Invoice</h1>
                </div>

                <div class="container-fluid bg-info" style={{ paddingTop: "30px", paddingBottom: "40px", paddingLeft: "" }}>
                    {/* <div className="auth-wrapper"> */}
                    <div className="invoice-inner">
                        <div className="col-md-7">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Mobile Number"
                                    value={searchMobile}
                                    onChange={onChangeSearchMobile}
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-warning bi bi-search"
                                        type="button"
                                        onClick={() => findByMobile()}
                                    >
                                        Search
                                        {/* <span class="bi bi-search">Search</span>  */}
                                    </button>
                                </div>

                            </div>

                            <div class="mb-4 row">
                                <div class="col-md-4">
                                    <label for="inputCity" class="form-label">Customer Name</label>
                                    <input type="text" value={name} name="name" class="form-control" id="inputCity" />
                                </div>

                                <div class="col-md-2">
                                    <label for="inputCity" class="form-label">Id</label>
                                    <input type="text" value={customerId} name="id" class="form-control" id="inputCity" />
                                </div>

                                <div class="col-md-2">
                                    <label for="inputCity" class="form-label">Segment</label>
                                    <input type="text" value={segment} name="segment" class="form-control" id="inputCity" />
                                </div>


                            </div>
                        </div>



                        <table id="users" class="table table-success table-striped" style={{ width: "100%" }}>
                            <thead>
                                <tr align="center">
                                    <th >Product Name</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>
                                        {/* <i class="bi bi-plus-circle" ></i> */}
                                        <button type="submit" class="bi bi-plus-lg btn-success" onClick={() => handleAddRow()}></button>
                                    </th>
                                </tr>
                            </thead>

                            {rows.length !== 0 && (
                                <tbody >
                                    {renderTable()}
                                </tbody>

                            )}
                            <tfoot style={{ height: "1px  !important" }}>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td class="col-sm-1" style={{ paddingLeft: "40px" }}>Total</td>
                                    <td class="col-sm-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={total}
                                        />
                                    </td>

                                </tr>

                                <tr >
                                    <td></td>
                                    <td></td>
                                    <td class="col-sm-1" style={{ paddingLeft: "40px" }}>Offer</td>
                                    <td class="col-sm-1" >
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={offer}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td class="col-sm-1" style={{ paddingLeft: "40px" }}>Payment</td>
                                    <td class="col-sm-1" >
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={payment}
                                        />
                                    </td>
                                </tr>
                            </tfoot>

                        </table>
                        <div>

                            <button type="submit" className="btn btn-danger" onClick={() => handleAddRow()}>Add Product</button> &nbsp;
                            <button type="submit" className="btn btn-primary btn-block" onClick={() => submitInvoice()}>Submit</button> &nbsp;

                            <button type="submit" className="btn btn-primary btn-block" onClick={() => productSuggestion()} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Suggest Products</button>
                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">Product Suggestion</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <p> Do you want to buy these items: </p>
                                            <p style={{ color: "blue" }}>  {predictItems}  </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* </div> */}
                </div>

                <div className="invoice-offer">
                    <h1 align="center" style={{ color: "white", textShadow: "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue" }}> Offer </h1>
                    <div class="row row-cols-1 row-cols-md-3 g-5" style={{ paddingTop: "40px", paddingBottom: "30px" }}>

                        <div class="col">
                            <div class="card h-100">
                                <img src={FirstInvoice} class="card-img-top" alt="" height={250} />
                                <div class="card-body">
                                    <h5 class="card-title">20% offer</h5>
                                    <p class="card-text">Supermarket gives 20% offer to high-level loyal customers. This system analyzes the high, low, and medium loyalty customers.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card h-100">
                                <img src={SecondInvoice} class="card-img-top" alt="" height={250} />
                                <div class="card-body">
                                    <h5 class="card-title">10% offer</h5>
                                    <p class="card-text">Supermarket gives 10% offer to medium-level loyal customers. This system analyzes the high, low, and medium loyalty customers.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card h-100">
                                <img src={ThirdInvoice} class="card-img-top" alt="" height={250} />
                                <div class="card-body">
                                    <h5 class="card-title">5% offer</h5>
                                    <p class="card-text">Supermarket gives 5% offer to low-level loyal customers. This system analyzes the high, low, and medium loyalty customers.</p>
                                </div>
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
    );
}

export default InvoiceAdd;