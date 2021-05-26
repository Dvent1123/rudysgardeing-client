import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import App from './App'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import UserHome from './user/UserHome'
import AdminHome from './admin/AdminHome'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Settings from './core/Settings'
import AdminSettings from './admin/AdminSettings'
import AdminPayments from './admin/AdminPayments'
import Checkout from './helpers/Checkout'
import Success from './helpers/Success'
import ErrorPage from './helpers/ErrorPage'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={Signup}/>
                <Route path="/signin" exact component={Signin}/>
                <PrivateRoute path='/home' exact component={UserHome} />
                <PrivateRoute path='/pay/:id/:service' exact component={Checkout} />
                <PrivateRoute path='/success/:id' exact component={Success} />
                <PrivateRoute path='/error' exact component={ErrorPage} />
                <PrivateRoute path='/settings' exact component={Settings} />
                <AdminRoute path='/admin' exact component={AdminHome} />
                <AdminRoute path='/admin/settings' exact component={AdminSettings} />
                <AdminRoute path='/admin/payments' exact component={AdminPayments} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes