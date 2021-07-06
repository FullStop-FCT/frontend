import React from "react"
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";

export default class MyDocument extends Document {
  render() {
    return (
      <Html >
        <Head>
          {/* Add fonts, favicon, etc */}

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />


          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />


        </Head>
        <body>
          <Main />
          <NextScript/>
        </body>
      </Html>
    );
  }


}