import React, { useState } from "react";
import axios from 'axios';
import NavEmployee from "../NavBar/navEmployee";

function InvoiceAdd(props) {
    const [rows, setRows] = useState([]);
    const [searchMobile, setSearchMobile] = useState("");
    const [name, setName] = useState("");
    const [customerId, setCustomerId] = useState("");

    const [searchProduct, setSearchProduct] = useState("");
    const [productId, setProductId] = useState("");




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
                }


            })
            .catch(function (error) {
                console.log(error);
            });
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





    const submitInvoice = () => {
        const da = new Date();


        rows.forEach(row => {
            console.log(row);

            const user = {
                productId: row.column_4,
                customerId: customerId,
                quantity: row.column_3,
                price: row.column_2,
                date: da
            };
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
        alert("Successful insert");
        

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
                            // value={searchProduct}
                            value={item.column_1}
                            // onChange={onChangeSearchProduct} 
                            onChange={handleChange(item)}
                        />
                    </td>
                    <td class="col-sm-2">
                        <input
                            type="text"
                            name="column_2"
                            class="form-control"
                            value={item.column_2}
                            onChange={handleChange(item)}
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


                    <td >
                        <button type="submit" className="btn btn-primary btn-block" onClick={() => findPrice(item)}>Price</button> &nbsp;
                        {/* <button type="submit" className="btn btn-danger" onClick={() => handleAddRow()}>Add</button> */}
                    </td>



                </tr>
            )
        })
    }



    return (
        <div>
            <NavEmployee />
            <h1 align="center">Invoice</h1>
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
                                    className="btn btn-warning"
                                    type="button"
                                    onClick={() => findByMobile()}
                                >
                                    Search
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


                        </div>
                    </div>



                    <table id="users" class="table table-success table-striped ">
                        <thead>
                            <tr align="center">
                                <th >Product Name</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th></th>
                            </tr>
                        </thead>

                        {rows.length !== 0 && (
                            <tbody >
                                {renderTable()}

                            </tbody>
                        )}

                    </table>
                    <div>

                        <button type="submit" className="btn btn-danger" onClick={() => handleAddRow()}>Add Product</button> &nbsp;
                        <button type="submit" className="btn btn-primary btn-block" onClick={() => submitInvoice()}>Submit</button>
                    </div>



                </div>

            </div>
        // </div>
    );
}

export default InvoiceAdd;