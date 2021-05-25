import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import axios from 'axios'
import { isAuth, getCookie, signout, updateUser } from '../helpers/auth'
import Bill from '../helpers/Bill'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const AdminHome = ({history}) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const [unpaid, setUnpaid] = useState([])

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
            .then(response => {
                const { role, name, email } = response.data;
                setValues({ ...values, role, name, email });
            })
            .catch(error => {
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const loadUnpaidPayments = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/payment/admin`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data.unpaid)
                setUnpaid(response.data.unpaid);
            })
            .catch(error => {
                toast.error(error.response.data.error)
            });
    };

    const { role, name, email, password, buttonText } = values;

    return ( 
        <Layout>
            <div>
                <ToastContainer />
                <h1>Admin Home {name}</h1>
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
);}

export default AdminHome;