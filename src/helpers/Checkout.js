import React from 'react';
import { useParams } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios'

// Load the publishable key from the server, install Stripe.js.
//we can put this inside use effect and then send the PRICE ID in the url parameter
let stripe;
(async () => {
  const response = await axios(`${process.env.REACT_APP_API}/stripe`)
  const { currency, publishableKey, unitAmount } = response.data
  stripe = await loadStripe(publishableKey, {
    apiVersion: '2020-08-27',
  });
})();

const Checkout = () => {
  const { id, service } = useParams()
  // When the buy button is clicked...
  const handleClick = async (event) => {
    if(!stripe) {
      alert('Stripe is not loaded yet.');
      return;
    }

    // Create a Checkout Session on the server
    const response = await axios(`${process.env.REACT_APP_API}/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        price: service,
        id: id}
    })


    const { sessionId } = response.data
    // Redirect to the Stripe hosted Checkout page.
    const {error} = await stripe.redirectToCheckout({ sessionId });

    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      alert(error.message);
    }
  };

  return (
    <div className="sr-root">
      <div className="sr-main">
        <header className="sr-header">
          <div className="sr-header__logo"></div>
        </header>
        <section className="container">
          <div>
            <h1>Single photo</h1>
            <h4>Purchase a Pasha original photo</h4>
            <div className="pasha-image">
              <img
                alt="Random asset from Picsum"
                src="https://picsum.photos/280/320?random=4"
                width="140"
                height="160"
              />
            </div>
          </div>

          <button onClick={handleClick}>Buy</button>
        </section>
      </div>
    </div>
  );
};

export default Checkout;