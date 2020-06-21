import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/home/home';
import Modal from './components/common/modal';
import Login from './components/home/login';
import Register from './components/home/register';
import Admin from './components/admin/admin';
import CustomerHome from './components/customer/customerHome';

function App() {
  return (
    <div className="App">
      <Modal />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact={true}/>
          <Route path="/login" component={Login} exact={true} />
          <Route path="/register" component={Register} exact={true} /> 
          <Route path="/admin" component={Admin} />
          <Route path="/account" component={CustomerHome} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
