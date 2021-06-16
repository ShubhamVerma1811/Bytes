import { UserContext } from 'context/UserContext'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import UseAnimations from 'react-useanimations'
import loadingAnimation from 'react-useanimations/lib/loading'
import {
  handleFirebaseLogIn,
  handleFirebaseSignUp,
} from 'services/authentication'
import { classnames } from 'tailwindcss-classnames'

export type AuthUserType = {
  uid: string
  email: string
  name: string
  verified: boolean
}

export const AuthForm = ({ type }: { type: string }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const handleLogIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await handleFirebaseLogIn(email, password)

    res.message ? setError(res.message) : setUser(res)
    setLoading(false)
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await handleFirebaseSignUp(email, password, name)

    res.message ? setError(res.message) : setUser(res)
    setLoading(false)
  }

  const LogIn = () => {
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
          <div
            className={classnames(
              classnames(loading ? 'bg-blue-300' : 'bg-blue-500'),
              'my-2',
              'relative'
            )}>
            <button
              className={classnames(
                'w-full',
                'py-3',
                'text-white',
                'font-semibold',
                'text-center'
              )}
              type='submit'>
              Log In
              <span
                className={classnames(
                  'absolute',
                  'top-2/4',
                  'left-2/4',
                  'translate-x-2/4',
                  'translate-y-2/4'
                )}>
                {loading && <UseAnimations animation={loadingAnimation} />}
              </span>
            </button>
          </div>
        </form>
        {error && (
          <p className={classnames('font-bold', 'text-red-500')}>{error}</p>
        )}
        <Link href='/signup'>
          <p
            className={classnames(
              'text-gray-400',
              'cursor-pointer',
              'hover:text-white'
            )}>
            Create an Account?
          </p>
        </Link>
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
          <div
            className={classnames(
              classnames(loading ? 'bg-blue-300' : 'bg-blue-500'),
              'my-2',
              'relative'
            )}>
            <button
              className={classnames(
                'w-full',
                'py-3',
                'text-white',
                'font-semibold',
                'text-center'
              )}
              type='submit'>
              Sign Up
              <span
                className={classnames(
                  'absolute',
                  'top-2/4',
                  'left-2/4',
                  'translate-x-2/4',
                  'translate-y-2/4'
                )}>
                {loading && (
                  <UseAnimations animation={loadingAnimation} color='blue' />
                )}
              </span>
            </button>
          </div>
        </form>
        {error && (
          <p className={classnames('font-bold', 'text-red-500')}>{error}</p>
        )}
        <Link href='/login'>
          <p
            className={classnames(
              'text-gray-400',
              'cursor-pointer',
              'hover:text-white'
            )}>
            Already Got an Account? Log In
          </p>
        </Link>
      </div>
    )
  }

  return (
    <div className={classnames('bg-gray-600', 'p-4', 'md:p-12')}>
      {type === 'login' ? LogIn() : SignUp()}
    </div>
  )
}

export default AuthForm
