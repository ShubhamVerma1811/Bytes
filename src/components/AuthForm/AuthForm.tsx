import { UserContext } from "context/UserContext"
import { PageLayout } from "layouts"
import React, { useContext, useState } from "react"
import {
  handleFirebaseLogIn,
  handleFirebaseSignUp,
} from "services/authentication"
import { classnames } from "tailwindcss-classnames"

export type AuthUserType = {
  uid: string
  email: string
  name: string
  verified: boolean
}

export const AuthForm = ({ type }: { type: string }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const { setUser } = useContext(UserContext)

  const handleLogIn = async (e) => {
    e.preventDefault()
    const res = await handleFirebaseLogIn(email, password)

    res.message ? setError(res.message) : setUser(res)
  }

  const handleSignUp = async (e) => {
    e.preventDefault()

    const res = await handleFirebaseSignUp(email, password, name)

    res.message ? setError(res.message) : setUser(res)
  }

  const SignIn = () => {
    return (
      <div className=''>
        <form onSubmit={handleLogIn}>
          <div>
            <label
              className='block mb-2 w-full text-white semibold'
              htmlFor='email'>
              Email
            </label>
            <input
              className='pl-3 w-full text-white py-2 bg-gray-700 focus-within:border-blue-500 border-2 border-gray-800'
              id='email'
              type='email'
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className='block my-2  w-full text-white semibold'
              htmlFor='password'>
              Password
            </label>
            <input
              className='pl-3 w-full text-white py-2 bg-gray-700 focus-within:border-blue-500 border-2 border-gray-800'
              id='password'
              type='password'
              value={password}
              placeholder='********'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='bg-blue-500 my-2'>
            <button
              className='w-full py-3 text-white font-semibold text-center'
              type='submit'>
              Log In
            </button>
          </div>
        </form>
        {error && (
          <p className={classnames("font-bold", "text-red-500")}>{error}</p>
        )}
      </div>
    )
  }

  const SignUp = () => {
    return (
      <div>
        <form onSubmit={handleSignUp}>
          <div className='my-3'>
            <label
              htmlFor='email'
              className='block mb-2 w-full text-white semibold'>
              Email
            </label>
            <input
              className='pl-3 w-full text-white py-2 bg-gray-700 focus-within:border-blue-500 border-2 border-gray-800'
              id='email'
              type='email'
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='my-3'>
            <label
              htmlFor='username'
              className='block mb-2 w-full text-white semibold'>
              Name
            </label>
            <input
              className='pl-3 w-full text-white py-2 bg-gray-700 focus-within:border-blue-500 border-2 border-gray-800'
              type='text'
              value={name}
              placeholder='Username'
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='my-3'>
            <label
              htmlFor='password'
              className='block mb-2 w-full text-white semibold'>
              Password
            </label>
            <input
              className='pl-3 w-full text-white py-2 bg-gray-700 focus-within:border-blue-500 border-2 border-gray-800'
              id='password'
              type='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='bg-blue-500 my-2'>
            <button
              type='submit'
              className='w-full py-3 text-white font-semibold text-center'>
              Submit
            </button>
          </div>
        </form>
        {error && (
          <p className={classnames("font-bold", "text-red-500")}>{error}</p>
        )}
      </div>
    )
  }

  return (
    <PageLayout>
      <div className={classnames("bg-gray-600", "p-4", "md:p-12")}>
        {type === "signin" ? SignIn() : SignUp()}
      </div>
    </PageLayout>
  )
}

export default AuthForm
