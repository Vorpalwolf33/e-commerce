import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import Home from './components/home/home';
import Modal from './components/common/modal';
import Login from './components/home/login';
import Register from './components/home/register';

function App() {
  return (
    <div className="App">
      <Modal />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact={true}/>
          <Route path="/login" component={Login} exact={true} />
          <Route path="/register" component={Register} exact={true} /> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
