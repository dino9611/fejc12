import React from 'react';

import './App.css';

import {Route,Switch} from 'react-router-dom'
import Home from './component/home';
import Login from './component/login';
import Register from './component/register';
import Header from './component/header';
import Verified from './component/verified';




function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/verified' component={Verified}/>
      </Switch>
    </div>
  );
}

export default App;
