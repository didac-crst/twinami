import Header from "./Header";
import React, { useState, useEffect } from "react";

function HomePage(){

  const [authStateUser, setAuthStateUser] = useState({});
  const [authStateAuthenticated, setAuthStateAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:9000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
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
  });

  const _handleNotAuthenticated = () => {
    setAuthStateAuthenticated(false);
  };

  return(
    <div>
        <Header
          authenticated={authStateAuthenticated}
          handleNotAuthenticated={_handleNotAuthenticated}
        />
        <div>
          {!authStateAuthenticated ? (
            <h1>Welcome!</h1>
          ) : (
            <div>
              <h1>You have login succcessfully!</h1>
              <h2>Welcome {authStateUser.name}!</h2>
            </div>
          )}
        </div>
      </div>
  );
}

export default HomePage;