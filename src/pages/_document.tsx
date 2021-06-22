import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { classnames, TArg } from 'tailwindcss-classnames'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='description' content='Bytes - Bite Sized Learinings!' />
          <link
            href='https://fontless-zeta.vercel.app/css?family=Karla:ital,wght@0,400;0,500;0,600&display=swap'
            rel='stylesheet'
          />
          <script
            async
            defer
            data-website-id={process.env.UMAMI_UID}
            src={process.env.UMAMI_URI}></script>
        </Head>
        <body
          className={classnames(
            'mx-4',
            'md:m-auto',
            'md:max-w-3xl',
            'lg:max-w-7xl',
            'min-h-screen',
            'dark:bg-gray-800' as TArg,
            'dark:text-white' as TArg
          )}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
