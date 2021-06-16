import { TwScreenDebug } from 'components'
import { UserContext } from 'context/UserContext'
import firebase from 'db/firebase/config'
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
        <UserContext.Provider value={{ user, setUser }}>
          <Head>
            <title>Bytes | Bit Sized Learining</title>
          </Head>
          <Component {...pageProps} />
        </UserContext.Provider>
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default MyApp
