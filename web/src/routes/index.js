import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import Orders from '../pages/Orders';
import OrderRegister from '../pages/Orders/Register';
import OrderEdit from '../pages/Orders/Edit';
import Transporters from '../pages/Transporters';
import TransporterRegister from '../pages/Transporters/Register';
import TransporterEdit from '../pages/Transporters/Edit';
import Recipients from '../pages/Recipients';
import RecipientRegister from '../pages/Recipients/Register';
import RecipientEdit from '../pages/Recipients/Edit';
import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/orders" component={Orders} isPrivate />
      <Route path="/order_register" component={OrderRegister} isPrivate />
      <Route path="/order/:id" component={OrderEdit} isPrivate />
      <Route path="/transporters" component={Transporters} isPrivate />
      <Route
        path="/transporter_register"
        component={TransporterRegister}
        isPrivate
      />
      <Route path="/transporter/:id" component={TransporterEdit} isPrivate />

      <Route path="/recipients" component={Recipients} isPrivate />
      <Route
        path="/recipient_register"
        component={RecipientRegister}
        isPrivate
      />
      <Route path="/recipient/:id" component={RecipientEdit} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
