import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from './login';
import adminPage from './component/Dashboard/adminPage';
import employeePage from './component/Dashboard/employeePage';


import EmployeeView from './component/Employee/employeeView'
import EmployeeAdd from './component/Employee/employeeAdd';


import CustomerView from './component/Customer/customerView';
import customerAdd from './component/Customer/customerAdd';


import productAdd from './component/Product/productAdd';
import ProductView from './component/Product/productView';


import InvoiceAdd from './component/Invoice/invoiceAdd';
import CustomerSegment from './component/Admin/customerSegment';
import ProcurementForecast from './component/Admin/procurementForecast';

import { ProtectedRouterEmployee, ProtectedRouterAdmin } from './component/ProtecterRouter';

function App() {

  return (
    <Router>

      <Switch>
        <Route exact path="/" component={Login} />


        <ProtectedRouterAdmin
          exact
          path="/admin"
          component={adminPage}
        />

        <ProtectedRouterAdmin
          exact
          path="/employeeview"
          component={EmployeeView}
        />

        <ProtectedRouterAdmin
          exact
          path="/employeeadd"
          component={EmployeeAdd}
        />

        <ProtectedRouterAdmin
          exact
          path="/segment"
          component={CustomerSegment}
        />

        <ProtectedRouterAdmin
          exact
          path="/forecast"
          component={ProcurementForecast}
        />

        <ProtectedRouterEmployee
          exact
          path="/employee"
          component={employeePage}
        />

        <ProtectedRouterEmployee
          exact
          path="/customerview"
          component={CustomerView}
        />

        <ProtectedRouterEmployee
          exact
          path="/customeradd"
          component={customerAdd}
        />

        <ProtectedRouterEmployee
          exact
          path="/productview"
          component={ProductView}
        />

        <ProtectedRouterEmployee
          exact
          path="/productadd"
          component={productAdd}
        />

        <ProtectedRouterEmployee
          exact
          path="/invoice"
          component={InvoiceAdd}
        />

        <Route path="*" component={() => "404 NOT FOUND"} />


        {/* <Route path="/admin" component={adminPage} /> */}
        {/* <Route path="/employee" component={employeePage} /> */}

        {/* <Route path="/employeeview" component={EmployeeView} />
        <Route path="/employeeadd" component={EmployeeAdd} /> */}
        
        {/* <Route path="/customerview" component={CustomerView} />
        <Route path="/customeradd" component={customerAdd} /> */}
        

        {/* <Route path="/productadd" component={productAdd} />
        <Route path="/productview" component={ProductView} /> */}
        
        {/* <Route path="/invoice" component={InvoiceAdd} /> */}
        {/* <Route path="/segment" component={CustomerSegment} />
        <Route path="/forecast" component={ProcurementForecast} /> */}


      </Switch>
    </Router>

  );
}

export default App;
