import Harper from 'db/harper/config'

const harper = new Harper()

export const getPost = async (pslug: string) => {
  const post = await harper.post({
    operation: 'sql',
    sql: `SELECT p.*,u.name FROM bytes.post AS p INNER JOIN bytes.user AS u ON u.uid=p.uid WHERE p.slug='${pslug}'`,
  })

  if (post.length) {
    const tags = await harper.post({
      operation: 'sql',
      sql: `SELECT t.* FROM bytes.post_tag AS pt INNER JOIN bytes.tag AS t ON pt.tid=t.tid WHERE pt.pid='${post[0]?.pid}'`,
    })

    return {
      props: {
        post: post[0],
        tags,
        results: post.length,
        message: 'OK',
      },
    }
  } else {
    return {
      props: {
        post: null,
        tags: null,
        message: "Post doesn't exist",
        result: null,
      },
    }
  }
}
