import React from 'react'

//each bill will take you to a page where you can view the individual bill
const Bill = ({bill, role}) => {
    const {_id, user, service, amount, total, due} = bill
    return (
        <div>
            <h3>User: {user}</h3>
            <h4>Service: {service}</h4>
            <h4>Amount: ${amount}</h4>
            <h4>Total: ${total}</h4>
            <h4>Due: {due}</h4>
        {
            role === "admin" ?
            null :
            <button><a href={`${process.env.REACT_APP_CLIENT}/pay/${_id}/${service}`}>View Bill</a></button>
        }
        </div>
    )
}

export default Bill