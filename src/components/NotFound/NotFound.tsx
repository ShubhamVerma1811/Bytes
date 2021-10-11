import { Title } from 'components'
import { PageLayout } from 'layouts'
import Link from 'next/link'
import React from 'react'
import Head from 'next/head'
import { classnames } from 'tailwindcss-classnames'

export const NotFound = ({
  message,
  title,
}: {
  message: string
  title: string
}) => {
  return (
    <PageLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <Title title={message} />
      <Link href='/' passHref>
        <div className={classnames('flex', 'justify-center')}>
          <a
            className={classnames(
              'font-medium',
              'underline',
              'cursor-pointer'
            )}>
            Go back Home
          </a>
        </div>
      </Link>
    </PageLayout>
  )
}

export default NotFound
