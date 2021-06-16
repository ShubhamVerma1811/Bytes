import AuthForm from 'components/AuthForm/AuthForm'
import useRequireLogin from 'hooks/useRequireLogin'
import { PageLayout } from 'layouts'
import Head from 'next/head'

const LogIn = () => {
  const { loading } = useRequireLogin({ to: '/' })

  return (
    <PageLayout>
      <div>
        <Head>
          <title>Log In to Bytes</title>
        </Head>
        <AuthForm type='login' />
      </div>
    </PageLayout>
  )
}

export default LogIn
