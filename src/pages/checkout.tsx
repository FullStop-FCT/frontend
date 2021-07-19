import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { api } from "../../services/api";
import jwt_decode from "jwt-decode";
import { Token } from '../types';


async function fetcher(path: string) {
  const token = Cookies.getJSON('token');
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type' : 'application/json'
    }
  }

  const decoded_token: Token = jwt_decode(token);

  return await api.post(path, decoded_token.iss, config).then(response => response.data.reverse()).catch(error => console.log(error));

}

const ProductDisplay = () => (

  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <form onSubmit={() => fetcher('create-checkout-session')}>
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}
