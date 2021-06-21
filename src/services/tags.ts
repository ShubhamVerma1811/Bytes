import Harper from 'db/harper/config'

const harper = new Harper()
export const getTagPosts = async (tname: string) => {
  const tag = await harper.post({
    operation: 'sql',
    sql: `SELECT * FROM bytes.tag AS t WHERE t.name='${tname
      .toString()
      .toLowerCase()}'`,
  })

  if (tag.length) {
    const posts = await harper.post({
      operation: 'sql',
      sql: `SELECT p.*,u.name,u.username FROM bytes.post_tag AS pt INNER JOIN bytes.post AS p ON pt.pid=p.pid INNER JOIN bytes.user AS u ON p.uid = u.uid WHERE pt.tid='${tag[0].tid}'`,
    })

    return {
      props: {
        posts,
        tag: tag[0],
        message: 'ok',
        results: posts.length,
      },
    }
  } else {
    return {
      props: {
        posts: [],
        tag: [],
        message: "Tag doesn't exist",
        results: null,
      },
    }
  }
}

export const getFeedTags = async () => {
  return await harper.post({
    operation: 'sql',
    sql: 'SELECT * FROM bytes.tag AS t ORDER BY t.__createdtime__ LIMIT 6',
  })
}
