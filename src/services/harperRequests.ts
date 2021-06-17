import Harper from 'db/harper/config'
import { UserType } from 'types/User'

const harper = new Harper()

export const getAuthUserFromHarper = async (uid: string): Promise<UserType> => {
  const res = await harper.post({
    operation: 'sql',
    sql: `SELECT * FROM bytes.user AS u WHERE u.uid='${uid}'`,
  })

  if (res) return res[0]
}
