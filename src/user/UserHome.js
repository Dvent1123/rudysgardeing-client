import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import axios from 'axios'
import { isAuth, getCookie, signout} from '../helpers/auth'
import { ToastContainer, toast} from 'react-toastify'
import Bill from '../helpers/Bill'
import 'react-toastify/dist/ReactToastify.min.css'

const UserHome = ({ history}) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
    })
    const [unpaid, setUnpaid] = useState([])

    const { name, role, email } = values
    const token = getCookie('token')

    useEffect(() => {
        loadProfile()
        loadUnpaidPayments()
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

    const loadUnpaidPayments = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/payment/user/${isAuth().email}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUnpaid(response.data.unpaid);
            })
            .catch(error => {
                toast.error(error.response.data.error)
            });
    };


    return (
        <Layout>
            <div>
                <ToastContainer />
                <h1>User Home for {name}</h1>
                <h2>Unpaid Services</h2>
                {
                    unpaid ?
                    unpaid.map(bill => {
                        return <Bill key={bill._id} bill={bill} role={role}/>
                    }) :

                    <h3>Loading...</h3>
                }
            </div>
        </Layout>
    )
}

export default UserHome