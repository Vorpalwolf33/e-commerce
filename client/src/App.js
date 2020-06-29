import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/home/home';
import Modal from './components/common/modal';
import Admin from './components/admin/admin';
import CustomerHome from './components/customer/customerHome';

function App() {
  return (
    <div className="App">
      <Modal />
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/account" component={CustomerHome} />
          <Route path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
