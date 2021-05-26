import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import axios from 'axios'
import {  getCookie } from '../helpers/auth'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import CurrencyInput from 'react-currency-input-field';


const AdminPayments = ({history}) => {
    const [values, setValues] = useState({
        email: 'Email',
        service: 'Description of Job',
        amount: 0.00,
        total: 0.00,
        paid_Status: false,
        due: "2014-11-20"
    });

    const [emails, setEmails] = useState([])

    const { email, service, amount, total, due } = values;
    const token = getCookie('token')

    useEffect(() => {
        loadEmails()
    }, [])

    const loadEmails = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/all`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log('All Emails', res.data)
            setEmails(res.data)
        })
        .catch(err => {
            console.log(err.response.data)
            toast.error(err.response.data.error)
        })
    }


    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };


    const clickSubmit = event => {
        event.preventDefault()
        console.log(process.env.REACT_APP_IRRIGATION)
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/payment`,
            data: values,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log('profile update success', res)
            toast.success('Bill Assigned')
        })
        .catch(err => {
            console.log(err.response.data)
            toast.error(err.response.data.error)
        })
    }

    const billingForm = () => (
        <form>
            <div>
                <label>Email</label>
                <select name="email" value={email} onChange={handleChange('email')}>
                    <option value="Pick">Pick and Email</option>
                    {
                        emails ?
                        emails.map((email, index) => {
                            return <option key={index} value={email}>{email}</option>
                        }) : 
                        <option value="None">No Emails</option>
                    }
                </select>
                {/* <input onChange={handleChange('email')} value={email} type="email" /> */}
            </div>

            <div>
                <label>Service(s)</label>
                <select name="service" value={service} onChange={handleChange('service')}>
                    <option value='None'>None</option>
                    <option value={process.env.REACT_APP_IRRIGATION}>$55: Irrigation</option>
                    <option value={process.env.REACT_APP_HARD_SCRAPE}>$75: Hard Scrape</option>
                    <option value={process.env.REACT_APP_LANDSCAPING}>$100: Landscaping</option>
                </select>
                {/* <input onChange={handleChange('service')} value={service} type="text" /> */}
            </div>
            <div>
                <label>Amount</label>
                <CurrencyInput
                    name="amount"
                    placeholder="Enter an Amount"
                    prefix="$"
                    defaultValue={amount}
                    decimalsLimit={2}
                    onValueChange={(value, name) => setValues({ ...values, [name]: value })}
                />;
            </div>
            <div>
                <label>Total</label>
                <CurrencyInput
                    name="total"
                    placeholder="Total"
                    prefix="$"
                    defaultValue={total}
                    decimalsLimit={2}
                    onValueChange={(value, name) => setValues({ ...values, [name]: value })}
                />;
            </div>
            <div>
                <label>Due Date</label>
                <input onChange={handleChange('due')} value={due} type="date" />
            </div>

            <div>
                <button onClick={clickSubmit}>
                    Submit Bill
                </button>
            </div>
        </form>
    );

    return ( 
        <Layout>
            <div>
                <ToastContainer />
                <h1>Make a Bill</h1>
                {billingForm()}            
            </div>    
        </Layout>
);}

export default AdminPayments;