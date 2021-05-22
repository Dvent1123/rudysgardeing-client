import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = ({ history }) => {
    const [values, setValues] = useState({
        email: 'Email Address',
        password: 'Password',
        buttonText: 'Submit'
    })

    const {email, password, buttonText} = values

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submittin'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password}
        })
        .then(res => {
            console.log('signin success', res)
            authenticate(res, () => {
                setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'})
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/home');
            })
        })
        .catch(error => {
            console.log('signin error', error.response.data)
            setValues({...values, buttonText: 'Submit'})
            toast.error(error.response.data.error)
        })
    }

    const signinForm = () => {
        return (<form>
            <div>
                <label>Email</label>
                <input onChange={handleChange('email')} value={email} type='email'/>
            </div>
            <div>
                <label>Password</label>
                <input onChange={handleChange('password')} value={password} type="password"/>
            </div>
            <div>
                <button onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>)
    }
    
    return (
        <Layout>
            <div>
                <ToastContainer />
                {isAuth() ? <Redirect to="/user/home" /> : null}
                <h1>Signin</h1>
                {signinForm()}
            </div>
        </Layout>
    );
}

export default Signin