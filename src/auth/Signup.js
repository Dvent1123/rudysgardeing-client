import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import { isAuth } from '../helpers/auth';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import axios from 'axios'

const Signup = () => {
    const [values, setValues] = useState({
        name: 'First & Last Name',
        email: 'Email',
        password: 'Password',
        buttonText: 'Submit'
    });

    const { name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    

//THIS ON SUBMIT NEEDS TO BE GRAPHQL
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: { name, email, password }
        })
            .then(response => {
                console.log('SIGNUP SUCCESS', response);
                setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                // toast.success(response.data.message);
            })
            .catch(error => {
                console.log('SIGNUP ERROR', error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };




    const signupForm = () => (
        <form>
            <div>
                <label>Name</label>
                <input onChange={handleChange('name')} value={name} type="text" />
            </div>

            <div>
                <label>Email</label>
                <input onChange={handleChange('email')} value={email} type="email" />
            </div>

            <div>
                <label>Password</label>
                <input onChange={handleChange('password')} value={password} type="password" />
            </div>

            <div>
                <button onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );


    return (
        <Layout>
            <div>
                <ToastContainer />
                {isAuth() ? <Redirect to="/user/home" /> : null}
                <h1>Signup</h1>
                {signupForm()}
            </div>
        </Layout>
)}

export default Signup