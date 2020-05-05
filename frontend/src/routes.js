import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewEvent from './pages/NewEvent';
import NewCompany from './pages/NewCompany';
import AdminUpdate from './pages/AdminUpdate';
import ProfileUpdate from './pages/ProfileUpdate';
import UserUpdate from './pages/UserUpdate';
import CompanyDetail from './pages/CompanyDetail';
import EventDetail from './pages/EventDetail';
import CompanyUpdate from './pages/CompanyUpdate';

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
                <Route path="/page/admin/update" exact component = {AdminUpdate} />
                <Route path="/page/user/profile/update" exact component = {ProfileUpdate} />
                <Route path="/page/user/update" exact component = {UserUpdate} />
                <Route path="/page/admin/company/detail" exact component = {CompanyDetail} />
                <Route path="/page/user/event/detail" exact component = {EventDetail} />
                <Route path="/page/admin/company/update" exact component = {CompanyUpdate} />
            </Switch>
        </BrowserRouter>
    );
}