import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import axios from 'axios'
import { isAuth, getCookie, signout } from '../helpers/auth'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const AdminSettings = ({ history }) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    })

    const token = getCookie('token')

    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log('private profile update', res)
            const { role, name, email } = res.data
            setValues({...values, role, name, email})
        })
        .catch(error => {
            console.log('private profile update error', error)
            if(error === 401) {
                signout(() => {
                    history.push('/')
                })
            }
        })
    }

    const { role, name, email, password, buttonText } = values

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value})
    }

    const clickSubmit = event => {
        event.preventDefault()

        setValues({ ...values, buttonText: 'Submitting'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/admin/update`,
            data: { name, password},
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log('profile update success', res)
            setValues({ ...values, buttonText: 'Submitted'})
            toast.success('Profile updated successfully')
        })
        .catch(err => {
            console.log(err.response.data)
            setValues({ ...values, buttonText: 'Submit'})
            toast.error(err.response.data.error)
        })
    }

    const updateForm = () => (
        <form>
            <div>
                <label>Role</label>
                <input defaultValue={role} type="text" disabled />
            </div>
            <div>
                <label>Name</label>
                <input onChange={handleChange('name')} value={name} type="text" />
            </div>

            <div>
                <label>Email</label>
                <input defaultValue={email} type="email" disabled />
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
        </form>
    );

    
    return (
    <Layout>
            <div>
                <ToastContainer />
                <h1>Settings</h1>
                <h3>Profile Update</h3>
                {updateForm()}
            </div>    
    </Layout>
);}

export default AdminSettings;