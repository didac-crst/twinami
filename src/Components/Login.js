import React from "react";
import { Dropdown} from 'react-bootstrap';

function Login (props){
    const _handleSignInClick = () => {
        // Authenticate using via passport api in the backend
        // Open Twitter login page
        // Upon successful login, a cookie session will be stored in the client
        window.open(props.linkAPI+"auth/google", "_self");
      };
    
      const _handleLogoutClick = () => {
        // Logout using Twitter passport api
        // Set authenticated state to false in the HomePage
        window.open(props.linkAPI+"auth/logout", "_self");
        props.handleNotAuthenticated();
      };

    return(
        <>
            {props.authenticated ? (
                <Dropdown.Item onClick={_handleLogoutClick}>{props.jsonCont.logout}</Dropdown.Item>
            ) : (
                <Dropdown.Item onClick={_handleSignInClick}>{props.jsonCont.login}</Dropdown.Item>
            )}
        </>
    );
}

export default Login;