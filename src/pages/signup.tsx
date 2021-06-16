import Link from 'next/link'
import AuthForm from '../components/AuthForm/AuthForm'
import Head from 'next/head'

const SignUp = () => {
  return (
    <div>
      <Head>
        <title>Sign Up on Bytes</title>
      </Head>
      <AuthForm type='signup' />
      <Link href='/login'>LogIn</Link>
    </div>
  )
}

export default SignUp
