import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import axios from 'axios'
import { isAuth, getCookie, signout} from '../helpers/auth'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const PrivateHome = ({ history}) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
    })

    const { name } = values
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
            const { role, name, email } = res.data
            setValues({role, name, email})
        })
        .catch(error => {
            console.log('private profile error', error)
            if(error === 401) {
                signout(() => {
                    history.push('/')
                })
            }
        })
    }


    return (
        <Layout>
            <h1>
                User Home for {name}
            </h1>
        </Layout>
    )
}

export default PrivateHome