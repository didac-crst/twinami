import React, {useState} from "react";
import LanguageToogle from "./LanguageToogle";
import Login from './Login';
import Connected from './Connected';
import { Navbar, Dropdown, DropdownButton} from 'react-bootstrap';

function NavbarSelf(props) {

    const [navbar,setNavbar] = useState(false);
    const [titleSize,setTitleSize] = useState(false);

    const changeBackgroung = () => {
        if(window.scrollY >= 140) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    const changeTitleSize = () => {
        if(window.scrollY >= 30) {
            setTitleSize(true);
        } else {
            setTitleSize(false);
        }
    }

    window.addEventListener('scroll', changeBackgroung);
    window.addEventListener('scroll', changeTitleSize);

    return (
        <Navbar className={navbar ? "navbar active" : "navbar"}>
            <Navbar.Brand href="#">
                <h1 className={titleSize ? "twinTitle active" : "twinTitle"}>Hello Twins!!!</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                <Connected
                    authenticated={props.authenticated}
                    authUser={props.authUser}
                />
                <DropdownButton menuAlign={'right'} id="dropdown-basic-button" title="Menu " variant="dark">
                    <Login
                        linkAPI={props.linkAPI}
                        authenticated={props.authenticated}
                        authUser={props.authUser}
                        handleNotAuthenticated={props.handleNotAuthenticated}
                    />
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-1">General</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">My Items</Dropdown.Item>
                    <Dropdown.Divider />
                    <LanguageToogle 
                        lang = {props.lang}
                        setLang = {props.setLang}
                        setReloadData = {props.setReloadData}
                    />
                </DropdownButton>
            </Navbar.Collapse>
        </Navbar>

      );
  }

  export default NavbarSelf;