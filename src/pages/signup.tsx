import Link from "next/link"
import AuthForm from "../components/AuthForm/AuthForm"

const signup = () => {
  return (
    <div>
      <AuthForm type='signup' />
      <Link href='/signin'>SignIn</Link>
    </div>
  )
}

export default signup
