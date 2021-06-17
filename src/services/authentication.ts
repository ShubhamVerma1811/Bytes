import firebase from 'db/firebase/config'
import Harper from 'db/harper/config'
import { generate as shortID } from 'shortid'
import slugify from 'slugify'
import { UserType } from 'types/User'
import { getAuthUserFromHarper } from './harperRequests'

const harper = new Harper()

export const handleFirebaseLogIn = async (email: string, password: string) => {
  try {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)

    const authUser: UserType = await getAuthUserFromHarper(user.uid)
    window.location.replace('/')
    return { ...authUser, isLoggedIn: true }
  } catch (err) {
    console.error(err)
    return err
  }
}

export const handleFirebaseSignUp = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)

    const authUser: UserType = {
      name,
      email: user.email,
      uid: user.uid,
      verified: false,
      username: slugify(name, { lower: true, strict: true }) + shortID(),
    }

    const res = await harper.post({
      operation: 'insert',
      schema: 'bytes',
      table: 'user',
      records: [{ ...authUser }],
    })
    window.location.replace('/')

    return { ...authUser, isLoggedIn: true }
  } catch (error) {
    console.error(error.message)
    return error
  }
}

export const handleFirebaseLogOut = () => {
  try {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Succesfully Logged out')
      })
  } catch (err) {
    console.error('LogOut ERR', err)
  }
}
