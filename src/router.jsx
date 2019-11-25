import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./_utils/history";
import Home from "./pages/home/Home";
import Drawing from "./pages/drawing/Drawing";
import Room from "./pages/room/Room";
import Ranking from "./pages/ranking/Ranking";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Nav from "./components/Nav/Navigation"
import StickyFooter from "./components/Footer/StickyFooter";
import {socket} from "./_utils/socket/socketManager";
const Routes = (props) => {
  console.log(props)
  console.log(socket)
  return (
    <Router history={history}>
      <div>
        <Nav/>
          {/* PAGES */}
          <Route path='/classement' component={Ranking} />
          <Route path='/salon' component={Room} />
          <Route exact path='/' component={Home} />

          {/* COMPONENTS */}
          <Route path='/draw' component={Drawing} />
          <Route path='/connection' component={SignIn} />
          <Route path='/inscription' component={SignUp} />
          <StickyFooter/>
      </div>
    </Router>
  );
};

export default Routes;
