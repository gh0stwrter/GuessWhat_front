import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Drawing from "./components/drawing/Drawing";
import Room from "./components/room/Room";
import Ranking from "./components/ranking/Ranking";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          {/* PAGES */}
          <Route path='/Classement' component={Ranking} />
          <Route path='/Salon' component={Room} />
          <Route exact path='/' component={Home} />

          {/* COMPONENTS */}
          <Route path='/draw' component={Drawing} />
          <Route path='/Connection' component={SignIn} />
          <Route path='/Inscription' component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
