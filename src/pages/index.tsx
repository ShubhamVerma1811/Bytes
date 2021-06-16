import { Pill, PostCard, Title } from 'components'
import Harper from 'db/harper/config'
import { GridLayout, PageLayout } from 'layouts'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { classnames } from 'tailwindcss-classnames'
import { PostType } from 'types/Post'
import { TagType } from 'types/Tag'

export default function Home({
  feedPosts,
  feedTags,
}: {
  feedPosts: Array<PostType>
  feedTags: Array<TagType>
}) {
  return (
    <PageLayout>
      <div className={classnames('flex', 'my-10', 'justify-center')}>
        <div>
          <div className={classnames('py-3')}>
            <Title title='Trending Tags' />
          </div>
          <div className={classnames('flex', 'flex-wrap')}>
            {feedTags?.map(({ name, tid, color }) => {
              return (
                <Fragment key={tid}>
                  <Link href={`/tag/${name}`}>
                    <div>
                      <Pill name={name} color={color} />
                    </div>
                  </Link>
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>

      <div>
        <div className={classnames('flex', 'my-5', 'justify-center')}>
          <div className={classnames('py-3')}>
            <Title title='Trending Bytes' />
          </div>
        </div>

        <GridLayout>
          {feedPosts?.map((post) => {
            return (
              <Fragment key={post.pid}>
                <PostCard post={post} />
              </Fragment>
            )
          })}
        </GridLayout>
      </div>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const harper = new Harper()
  const feedPosts = await harper.post({
    operation: 'sql',
    sql: 'SELECT p.*,u.name FROM bytes.post AS p INNER JOIN bytes.user AS u ON p.uid = u.uid LIMIT 6',
  })

  const feedTags = await harper.post({
    operation: 'sql',
    sql: 'SELECT * FROM bytes.tag LIMIT 5',
  })

  return {
    props: {
      feedPosts,
      feedTags,
    },
  }
}
