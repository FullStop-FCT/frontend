import '../styles/global.scss'
import React from 'react'
import { AuthContextProvider } from '../Context/AuthContext'
function MyApp({ Component, pageProps }) {
  
  return (
  <AuthContextProvider >
    <Component {...pageProps} />
  </AuthContextProvider>
  
  )
}

export default MyApp
