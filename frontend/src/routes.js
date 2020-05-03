import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewEvent from './pages/NewEvent';
import NewCompany from './pages/NewCompany';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/page/login" exact component = {Login} />
                <Route path="/page/admin/profile" exact component = {Admin} />
                <Route path="/page/register" exact component = {Register} />                
                <Route path="/page/user/profile" exact component = {Profile} />
                <Route path="/page/user/newevent" exact component = {NewEvent} />
                <Route path="/page/admin/newcompany" exact component = {NewCompany} />
            </Switch>
        </BrowserRouter>
    );
}