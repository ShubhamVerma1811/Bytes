import { UserContext } from "context/UserContext"
import firebase from "db/firebase/config"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { getAuthUserFromHarper } from "services/harperRequests"

const useRequireLogin = ({ to }: { to: string }) => {
  const router = useRouter()

  const { user, setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const authUser = await getAuthUserFromHarper(user.uid)
        setUser({ ...authUser, isLoggedIn: true })
        setLoading(false)
        router.push(to)
      } else {
        setUser({})
        setLoading(false)
        router.push("/login")
      }
    })
  }, [])

  return { user, loading }
}

export default useRequireLogin
