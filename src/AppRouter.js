import React from "react";
import AppBody from './Components/AppBody';
import HomePage from "./Components/Homepage";
import { BrowserRouter as Router, Route } from "react-router-dom";


function AppRouter() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={AppBody} />
        <Route exact path="/" component={HomePage} />
      </div>
    </Router>
  );
}

export default AppRouter;