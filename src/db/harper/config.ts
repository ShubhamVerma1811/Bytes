class Harper {
  async post(body) {
    try {
      const headers = new Headers()
      headers.append("Content-Type", "application/json")
      headers.append("Authorization", `Basic ${process.env.HARPER_BYTES_BASIC}`)

      const res = await fetch(process.env.HARPER_BYTES_URI, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      })
      const data = await res.json()

      return data
    } catch (error) {
      console.error(error)
    }
  }
}

export default Harper
