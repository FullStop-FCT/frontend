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

  let decoded_token: Token = jwt_decode(token);
  console.log(decoded_token.iss)
  let externallink: string = '';
  await api.post(path, decoded_token.iss, config).then(response => window.location.href = response.data).catch(error => console.log(error));

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
      <button type="submit" onClick={ () => fetcher('create-checkout-session')}>
        Checkout
      </button>
  </section>
);



export default function App() {


  return  (
    <ProductDisplay />
  );
}
