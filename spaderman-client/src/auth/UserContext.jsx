import React, { useContext, useState, useEffect } from "react";
import APIHandler from "./../api/APIHandler";

export const UserContext = React.createContext();

/**
 *
 * @param {Object} props
 * @returns a Provider wrappinng the authentication logic
 */
export const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    APIHandler.get("/is-loggedin")
      .then((res) => {
        setIsLoading(false);
        setCurrentUser(res.data.currentUser);
      })
      .catch(() => {
        setCurrentUser(null);
        setIsLoading(false);
      });
  }, []);

  const isLoggedIn = Boolean(currentUser); // checked on every render => passed to the

  return (
    <UserContext.Provider
      value={{ currentUser, isLoading, isLoggedIn, setCurrentUser }}
    >
      {!isLoading ? props.children : null}
    </UserContext.Provider>
  );
};

/**
 * provide the UserContext to class/ based components
 * in  classes, the UserContext is bound to this.props.userContext
 * @param {React.Component} MyComponent any class based component
 * @returns A consumer component accessign the values exposed by the UserContext
 */
export const withAuth = (MyComponent) => {
  return (props) => {
    return (
      <UserContext.Consumer>
        {(context) => {
          return <MyComponent {...props} userContext={context} />;
        }}
      </UserContext.Consumer>
    );
  };
};

/**
 * a utility function (shortcut) so you don't have to import the Context + useContext in you app's functionnal components
 * @returns
 */
export const useAuth = () => useContext(UserContext);
