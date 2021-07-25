import Cookies from 'js-cookie';
import { api } from "../../services/api";
import jwt_decode from "jwt-decode";
import styles from './styles/payment.module.scss';
import Header from '../Components/Header';


let decoded_token = null;
try {
  decoded_token = jwt_decode(Cookies.getJSON('token'));
  // valid token format
} catch(error) {
  // invalid token format
}

const config = {
  headers: {
    'Authorization': 'Bearer ' + Cookies.getJSON('token'),
    'Content-Type' : 'application/json'
  }
}

async function fetcher(path: string) {
  
  
  await api.post(path, decoded_token.iss, config)
            .then(response => window.location.href = response.data)
            .catch(error => console.log(error));

} 

const ProductDisplay = () => (
  <div className={styles.container}>

      <div className={styles.header}>
          <Header />
      </div>
      
      <div className={styles.certificate}>
          <div>
              <img className={styles.image}
                  src="https://cdn.pixabay.com/photo/2012/04/02/17/10/certificate-24960_960_720.png"
              />
              <div className="description">
                  <h3>Certificado</h3>
                  <h5>2.99€</h5>
              </div>
          </div>
            <button type="submit" onClick={ () => fetcher('create-checkout-session')}>
                Checkout
            </button>
      </div>
  </div>
);

export default function App() {

  return (
    <ProductDisplay />
  );
}
