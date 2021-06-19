import { TwScreenDebug } from 'components'
import { UserContext } from 'context/UserContext'
import firebase from 'db/firebase/config'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import 'nprogress/nprogress.css'
import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { getAuthUserFromHarper } from 'services/harperRequests'
import 'styles/tailwind.css'

const TopProgressBar = dynamic(
  () => {
    return import('components/TopProgressBar/TopProgressBar')
  },
  { ssr: false }
)

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState({})

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const authUser = await getAuthUserFromHarper(user.uid)
        setUser({ ...authUser, isLoggedIn: true })
      } else {
        setUser({})
      }
    })
  }, [])

  return (
    <React.Fragment>
      {process.env.NODE_ENV === 'development' && <TwScreenDebug />}
      <TopProgressBar />
      <QueryClientProvider client={queryClient}>
        {/* @ts-ignore */}
        <UserContext.Provider value={{ user, setUser }}>
          <Head>
            <title>Bytes | Bit Sized Learining</title>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1, viewport-fit=cover'
            />
            <link
              rel='apple-touch-icon'
              sizes='180x180'
              href='/apple-touch-icon.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='32x32'
              href='/favicon-32x32.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='16x16'
              href='/favicon-16x16.png'
            />
            <link rel='manifest' href='/site.webmanifest' />
          </Head>
          <ThemeProvider attribute='class'>
            <Component {...pageProps} />
          </ThemeProvider>
        </UserContext.Provider>
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default MyApp
