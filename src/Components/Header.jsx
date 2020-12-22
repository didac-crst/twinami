import { Link } from "react-router-dom";
import React from "react";


function Header(props){

  const _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    window.open("http://localhost:9000/auth/google", "_self");
  };

  const _handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    window.open("http://localhost:9000/auth/logout", "_self");
    props.handleNotAuthenticated();
  };

  return (
    <ul className="menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      {props.authenticated ? (
        <li onClick={_handleLogoutClick}>Logout</li>
      ) : (
        <li onClick={_handleSignInClick}>Login</li>
      )}
    </ul>
  );
}

export default Header;