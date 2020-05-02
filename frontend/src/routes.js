import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/page/login" exact component = {Login} />
                <Route path="/page/admin" exact component = {Admin} />
            </Switch>
        </BrowserRouter>
    );
}