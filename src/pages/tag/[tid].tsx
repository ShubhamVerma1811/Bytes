import { NotFound, Pill, PostCard } from 'components'
import Harper from 'db/harper/config'
import { GridLayout, PageLayout } from 'layouts'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import React from 'react'
import { classnames } from 'tailwindcss-classnames'
import { PostType } from 'types/Post'
import { TagType } from 'types/Tag'

const TagID = ({
  posts,
  tag,
  results,
  message,
}: {
  posts: Array<PostType>
  tag: TagType
  results: [] | null
  message: string
}) => {
  if (!results) return <NotFound message={message} />

  return (
    <PageLayout>
      <div className={classnames('flex', 'items-center')}>
        <p className={classnames('text-xl')}>Posts with the tag :</p>
        <Pill name={tag.name} color={tag.color} />
      </div>
      <GridLayout>
        {posts?.map((post) => (
          <Link href={`/byte/${post.slug}`} key={post.pid}>
            <div>
              <PostCard post={post} />
            </div>
          </Link>
        ))}
      </GridLayout>
    </PageLayout>
  )
}

export default TagID

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { tid: tname } = query

  const harper = new Harper()

  const tag = await harper.post({
    operation: 'sql',
    sql: `SELECT * FROM bytes.tag AS t WHERE t.name='${tname
      .toString()
      .toLowerCase()}'`,
  })

  if (tag.length) {
    const posts = await harper.post({
      operation: 'sql',
      sql: `SELECT p.*,u.name FROM bytes.post_tag AS pt INNER JOIN bytes.post AS p ON pt.pid=p.pid INNER JOIN bytes.user AS u ON p.uid = u.uid WHERE pt.tid='${tag[0].tid}'`,
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
