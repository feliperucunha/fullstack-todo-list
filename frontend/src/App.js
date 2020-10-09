import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NewEventForm from "./components/NewEventForm";
import Register from "./components/Register/index"

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path='/register' exact render={props => <Register {...props} />} />
        <Route exact path="/events/new">
          <NewEventForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
