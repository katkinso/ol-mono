import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from './components/Login/index';
import Dashboard from './components/Dashboard/index';
import NotFound from './components/404/index';
import SessionDetail from './components/SessionDetail/index';
import UserProfile from './components/UserProfile/index';


class App extends Component {


    render() {

      return (
        <BrowserRouter>
            <Switch>
              <Route exact path="/authenticate"><Login/></Route>
              <Route exact path="/register"><Login/></Route>
              <Route exact path="/dashboard"><Dashboard/></Route>
              <Route exact path="/"><Login/></Route>
              <Route path="/session/:id"><SessionDetail/></Route>
              <Route path="/profile"><UserProfile/></Route>
              <Route path="/"><NotFound/></Route>
            </Switch>
        </BrowserRouter>
      );
    }
  }
  
  export default App;

  ///register top course then point to a component to define subroutes. 
  