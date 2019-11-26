import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./_utils/history";
import Home from "./pages/home/Home";
import Room from "./pages/room/Room";
import Ranking from "./pages/ranking/Ranking";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Nav from "./components/Nav/Navigation"
import StickyFooter from "./components/Footer/StickyFooter";
import {socket} from "./_utils/socket/socketManager";
import {PrivateRoute} from "./middleware/privateRoute";
import Notfound from "./components/404/NotFound";

const Routes = (props) => {
  console.log(props)
  console.log(socket)


  return (
    <Router history={history}>
      <Nav/>
      <div>
          {/* PAGES */}
          <Switch>
          <Route exec path='/classement' component={Ranking} />
          <PrivateRoute path='/salon/:id' component={Room} />
          <Route exec path='/salon' component={Room}  />
          <Route exact path='/' component={Home} />

          {/* COMPONENTS */}
          <Route exac path='/connexion' component={SignIn} />
          <Route exac path='/inscription' component={SignUp} />
          <Route exact component={Notfound}/>
          <StickyFooter/>
          </Switch>
      </div>
    </Router>
  );
};

export default Routes;
