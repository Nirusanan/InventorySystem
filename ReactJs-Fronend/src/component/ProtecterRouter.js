// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const ProtectedRouter = ({component,...rest}) => {
//     console.log(component);
//     console.log(rest);

//     let RenderComponents = component;
//     return (
//         <Route
//             {...rest}
//             render = {props => {
//                 return true ? (
//                     <RenderComponents {...props} />
//                 ) : (
//                     <Redirect
//                     to = {{
//                         pathname: '/'
//                     }}
//                     />
//                 )
//             }       
//             }
//         />
//     )
// }
// export default ProtectedRouter;






import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRouterEmployee = ({ component: Component, ...rest }) => {
  // const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          
          return <Component {...props} />;
          
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};



const ProtectedRouterAdmin = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};





export {
  ProtectedRouterEmployee,
  ProtectedRouterAdmin,
};