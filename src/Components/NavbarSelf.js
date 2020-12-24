import React, {useState, useEffect} from "react";
import LanguageToogle from "./LanguageToogle";
import Login from './Login';
import Connected from './Connected';
import { Navbar, Dropdown, DropdownButton} from 'react-bootstrap';

function NavbarSelf(props) {

    const page = "navbar";

    //FETCHING CONTENT DATA
    const linkContent = props.linkAPI+"content/"+page+":"+props.lang;
    const [jsonCont, setJsonCont] = useState({});
    const [loadCont, setLoadCont] = useState(false);

    useEffect(() => {
        if (!loadCont){
        fetch(linkContent)
            .then(res => res.json())
            .then(json => {
            setJsonCont(json);
            setLoadCont(true);
            }
        );
        }
    });

    // RELOAD INFO
    useEffect (() => {
        if (props.reloadNav){
            setLoadCont(false);
            props.setReloadNav(false);
        }
    });

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

    function goToGeneral(){
        props.setTabDisplayed("General");
    }

    function goToItems(){
        props.setTabDisplayed("Items");
    }

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
                    jsonCont={jsonCont}
                />
                {loadCont && (
                    <DropdownButton menuAlign={'right'} id="dropdown-basic-button" title={jsonCont.menu} variant="dark">
                        <Login
                            linkAPI={props.linkAPI}
                            authenticated={props.authenticated}
                            authUser={props.authUser}
                            handleNotAuthenticated={props.handleNotAuthenticated}
                            jsonCont={jsonCont}
                        />
                        <Dropdown.Divider />
                        {props.authenticated && (
                            <>
                            {(props.tabDisplayed === "General") ? (
                                <Dropdown.Item onClick={goToGeneral} disabled>{jsonCont.general}</Dropdown.Item>
                            ):(
                                <Dropdown.Item onClick={goToGeneral}>{jsonCont.general}</Dropdown.Item>
                            )}
                            {(props.tabDisplayed === "Items") ? (
                                <Dropdown.Item onClick={goToItems} disabled>{jsonCont.items}</Dropdown.Item>
                            ):(
                                <Dropdown.Item onClick={goToItems}>{jsonCont.items}</Dropdown.Item>
                            )}
                            <Dropdown.Divider />
                            </>
                        )}
                        <LanguageToogle 
                            lang = {props.lang}
                            languageMenu = {jsonCont.language}
                            setLang = {props.setLang}
                            setReloadData = {props.setReloadData}
                            setReloadTitle = {props.setReloadTitle}
                            setReloadNav = {props.setReloadNav}
                            setReloadItems = {props.setReloadItems}
                        />
                    </DropdownButton>
                )}
            </Navbar.Collapse>
        </Navbar>

      );
  }

  export default NavbarSelf;