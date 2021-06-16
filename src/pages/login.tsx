import AuthForm from 'components/AuthForm/AuthForm'
import useRequireLogin from 'hooks/useRequireLogin'
import Link from 'next/link'
import Head from 'next/head'

const LogIn = () => {
  const _ = useRequireLogin({ to: '/' })

  return (
    <div>
      <Head>
        <title>Log In to Bytes</title>
      </Head>
      <AuthForm type='login' />
      <Link href='/signup'>SignUp</Link>
    </div>
  )
}

export default LogIn
