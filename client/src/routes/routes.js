import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App from '../components/App';
import Registration from '../components/Registration';
// import Home from '../components/home'
import Adminlogin from '../components/admin-login';

export default class Routes extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" exact component={App} />
          <Switch>
            {/* <Route path="/home" exact component={Home} /> */}
            <Route path="/admin-login" exact component={Adminlogin} />
            <Route path="/Registration" exact component={Registration} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
