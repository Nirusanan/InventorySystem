import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from './login';
import adminPage from './component/Dashboard/adminPage';
import employeePage from './component/Dashboard/employeePage';


import EmployeeView from './component/Employee/employeeView'
import EmployeeAdd from './component/Employee/employeeAdd';
import Update from './component/Employee/employeeEdit';

import CustomerView from './component/Customer/customerView';
import customerAdd from './component/Customer/customerAdd';
import customerEdit from './component/Customer/customerEdit';

import productAdd from './component/Product/productAdd';
import ProductView from './component/Product/productView';
import productEdit from './component/Product/productEdit';

import InvoiceAdd from './component/Invoice/invoiceAdd';
import CustomerSegment from './component/Admin/customerSegment';



function App() {

  return (
    <Router>

      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/admin" component={adminPage} />
        <Route path="/employee" component={employeePage} />

        <Route path="/employeeview" component={EmployeeView} />
        <Route path="/employeeadd" component={EmployeeAdd} />
        <Route path="/employeeedit" component={Update} />
        <Route path="/customerview" component={CustomerView} />
        <Route path="/customeradd" component={customerAdd} />
        <Route path="/customeredit" component={customerEdit} />
        <Route path="/productadd" component={productAdd} />
        <Route path="/productview" component={ProductView} />
        <Route path="/productedit" component={productEdit} />
        <Route path="/invoice" component={InvoiceAdd} />
        <Route path="/segment" component={CustomerSegment} /> 


        <Route path="*" component={() =>"404 NOT FOUND"} /> 

      </Switch>
    </Router>

  );
}

export default App;
