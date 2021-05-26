import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import axios from 'axios'
import { isAuth, getCookie, signout } from '../helpers/auth'
import { useParams } from 'react-router-dom'

const Success = ({history}) => {
    const token = getCookie('token')
    const { id } = useParams()

    useEffect(() => {
        changePaymentStatusofBill()
    }, [])

    const changePaymentStatusofBill = () => {
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/payment/success`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                email: isAuth().email,
                id: id
            }
        })
        .then(res => {
            console.log(res)
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
            <h3>{isAuth().email}</h3>
            <h1>Successful Payment Made</h1>
            <button><a href={`${process.env.REACT_APP_CLIENT}/home`}>Click Here to go home</a></button>
        </Layout>
    )
}

export default Success