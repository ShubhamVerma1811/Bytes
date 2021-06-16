import { PageLayout } from 'layouts'
import Head from 'next/head'
import AuthForm from '../components/AuthForm/AuthForm'

const SignUp = () => {
  return (
    <PageLayout>
      <div>
        <Head>
          <title>Sign Up on Bytes</title>
        </Head>
        <AuthForm type='signup' />
      </div>
    </PageLayout>
  )
}

export default SignUp
