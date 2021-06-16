import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { classnames } from 'tailwindcss-classnames'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fontless-zeta.vercel.app/css?family=Karla:ital,wght@0,400;0,500;0,600&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body
          className={classnames(
            'mx-4',
            'md:m-auto',
            'md:max-w-3xl',
            'lg:max-w-7xl'
          )}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
