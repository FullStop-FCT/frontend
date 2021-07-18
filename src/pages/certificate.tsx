import Header from '../Components/Header'
import styles from './styles/payment.module.scss';
import { useState, useEffect } from "react";


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
            <form action="/create-checkout-session" method="POST">
                <button type="submit">
                    Checkout
                </button>
            </form>
        </div>
    </div>
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