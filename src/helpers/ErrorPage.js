import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import axios from 'axios'

const ErrorPage = () => {

    return (
        <Layout>
            <h1>There was an error submitting your payment :(</h1>
            <h2>Click Here to Return to Dashboard</h2>
        </Layout>
    )
}

export default ErrorPage