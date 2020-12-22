import React, {useState, useEffect} from "react";
import NavbarSelf from './NavbarSelf';
import TitleBackground from './TitleBackgroung';
import TabStorefront from './TabStorefront';
import Footer from './Footer';
import Environment from '../Environment';



function AppBody(props) {
  const linkAPI = Environment.SERVER_HOME_PAGE_URL+"/";

  const [reloadData, setReloadData] = useState(false);

  // AUTHENTICATION
  const [authStateUser, setAuthStateUser] = useState({});
  const [authStateAuthenticated, setAuthStateAuthenticated] = useState(false);

  useEffect(() => {
    if (!authStateAuthenticated) {
      fetch(linkAPI+"auth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": Environment.CLIENT_HOME_PAGE_URL
          }
      })
      .then(response => {
          if (response.status === 200) return response.json();
          throw new Error("failed to authenticate user");
          })
      .then(responseJson => {
          setAuthStateAuthenticated(true);
          setAuthStateUser(responseJson.user);
      })
      .catch(error => {
          setAuthStateAuthenticated(false);
      });
    }
  });

  const _handleNotAuthenticated = () => {
    setAuthStateAuthenticated(false);
  };

    return (
      <div id="appbody">
        <NavbarSelf 
          linkAPI = {linkAPI}
          lang = {props.lang}
          setLang = {props.setLang}
          setReloadData = {setReloadData}
          authenticated={authStateAuthenticated}
          authUser={authStateUser}
          handleNotAuthenticated={_handleNotAuthenticated}
        />

        <TitleBackground />

        <TabStorefront
          reloadData = {reloadData}
          setReloadData = {setReloadData}
          lang = {props.lang}
          linkAPI = {linkAPI}
        />

        <Footer />
      </div>
    );
}

  export default AppBody;