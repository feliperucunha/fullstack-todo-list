import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NewEventForm from "./components/NewEventForm";
import Register from "./components/Register/index"
import Activate from "./components/Activate/index"
import ResetPassword from "./components/ResetPassword/index"
import Login from "./components/Login/index"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path='/register' exact render={props => <Register {...props} />} />
        <Route path='/activate' exact render={props => <Activate {...props} />} />
        <Route path='/login' exact render={props => <Login {...props} />} />
        <Route path='/reset' exact render={props => <ResetPassword {...props} />} />
        <Route exact path="/events/new">
          <NewEventForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
