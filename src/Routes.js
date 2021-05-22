import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import App from './App'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import UserHome from './user/UserHome'
import PrivateRoute from './auth/PrivateRoute'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={Signup}/>
                <Route path="/signin" exact component={Signin}/>
                <PrivateRoute path='/home' exact component={UserHome} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes