import '../styles/global.scss'
import React from 'react'
import { AuthContextProvider } from '../Context/AuthContext'
import { MapContextProvider } from '../Context/MapContext'
function MyApp({ Component, pageProps }) {

  return (

    <AuthContextProvider >
      <MapContextProvider>
        <Component {...pageProps} />
      </MapContextProvider>
    </AuthContextProvider>

  )
}

export default MyApp
