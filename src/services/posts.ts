import Harper from 'db/harper/config'
import { Post } from 'types/Post'
import { TagType } from 'types/Tag'

const harper = new Harper()

export const getPost = async (pslug: string) => {
  const post: Post[] = await harper.post({
    operation: 'sql',
    sql: `SELECT p.*,u.name,u.username FROM bytes.post AS p INNER JOIN bytes.user AS u ON u.uid=p.uid WHERE p.slug='${pslug}'`,
  })

  if (post.length) {
    const tags: TagType[] = await harper.post({
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
        results: null,
      },
    }
  }
}

export const updatePostReaction = async (postSlug: string, count: number) => {
  const {
    props: {
      post: { reactions, pid },
    },
  } = await getPost(postSlug)

  await harper.post({
    operation: 'update',
    schema: 'bytes',
    table: 'post',
    records: [
      {
        pid,
        reactions: reactions + count,
      },
    ],
  })
}

export const getFeedPosts = async () => {
  return await harper.post({
    operation: 'sql',
    sql: 'SELECT p.*,u.name,u.username FROM bytes.post AS p INNER JOIN bytes.user AS u ON p.uid = u.uid ORDER BY p.__createdtime__ LIMIT 6',
  })
}
