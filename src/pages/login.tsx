import AuthForm from "components/AuthForm/AuthForm"
import useRequireLogin from "hooks/useRequireLogin"
import Link from "next/link"

const signin = () => {
  const _ = useRequireLogin({ to: "/" })

  return (
    <div>
      <AuthForm type='signin' />
      <Link href='/signup'>SignUp</Link>
    </div>
  )
}

export default signin
