import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuth, signout} from '../helpers/auth'

const Layout = ({children, match, history}) => {
    const nav = () => {
        return (
            <ul>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                {
                    !isAuth() && (
                        <Fragment>
                            <li>
                                <Link to="/signup">
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                            <Link to="/signin">
                                    Sign In
                                </Link>
                            </li>
                        </Fragment>
                    )
                }
                {isAuth() && (
                    <li>
                        <span
                            onClick={() => {
                                signout(() => {
                                    history.push('/');
                                });
                            }}
                        >
                            Sign Out
                        </span>
                    </li>
                )}
            </ul>
        )
    }

    return (
        <Fragment>
            <div>
                {nav()}
            </div>
            <div>
                {children}
            </div>
        </Fragment>
    )
}

export default withRouter(Layout)