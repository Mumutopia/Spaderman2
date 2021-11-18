import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./UserContext";

/* 
...foo
@mdn : A function's last parameter can be prefixed with "..."
which will cause all remaining (user supplied) arguments to be placed within a "standard" javascript array. 
Only the last parameter can be a "rest parameter".
*/
// line below : use of the rest parameter
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, isLoading } = useAuth();
  // return default template while performing async auth task
  // isLoading is true while we come 
  if (isLoading) return <div>Loading...</div>;
  return isLoggedIn ? (
    // if logged in, return a regular Route component
    // this Route gets any passed (...rested) props in a literal object
    // then we pass the rested props AND the routes props (history, location, match) ...
    // to the rendered Component (in this case Dashboard)
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    // if not logged in redirect to signin
    // <Redirect to="/signin" />
    <Navigate to="/signin" />
    
  );
};
