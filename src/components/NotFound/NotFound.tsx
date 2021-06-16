import { Title } from 'components'
import { PageLayout } from 'layouts'
import Link from 'next/link'
import React from 'react'
import Head from 'next/head'
import { classnames } from 'tailwindcss-classnames'

export const NotFound = ({ message }) => {
  return (
    <PageLayout>
      <Head>
        <title>404 Not Found</title>
      </Head>
      <Title title={message} />
      <Link href='/'>
        <div className={classnames('flex', 'justify-center')}>
          <p
            className={classnames(
              'font-medium',
              'underline',
              'cursor-pointer'
            )}>
            Go back Home
          </p>
        </div>
      </Link>
    </PageLayout>
  )
}

export default NotFound
