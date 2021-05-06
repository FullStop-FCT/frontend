import React from "react"
import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
  render(){
    return (
      <Html>
        <Head>
          {/* Add fonts, favicon, etc */}

          </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }


}