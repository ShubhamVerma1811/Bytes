import { AuthUserType } from "components"
import Harper from "db/harper/config"

const harper = new Harper()

export const getAuthUserFromHarper = async (
  uid: string
): Promise<AuthUserType> => {
  const res = await harper.post({
    operation: "sql",
    sql: `SELECT * FROM bytes.user AS u WHERE u.uid='${uid}'`,
  })

  if (res) return res[0]
}
