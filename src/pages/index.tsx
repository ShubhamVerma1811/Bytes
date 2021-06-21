import { Pill, PostCard, Title } from 'components'
import { GridLayout, PageLayout } from 'layouts'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { useQuery } from 'react-query'
import { getFeedPosts } from 'services/posts'
import { getFeedTags } from 'services/tags'
import { classnames } from 'tailwindcss-classnames'
import { Post } from 'types/Post'
import { TagType } from 'types/Tag'

export default function Home(props: {
  feedPosts: Array<Post>
  feedTags: Array<TagType>
}) {
  const {
    data: feedPosts,
    error: postsErr,
    isLoading: postsLoading,
  } = useQuery(
    'feedPosts',
    async () => {
      return await getFeedPosts()
    },
    {
      initialData: props.feedPosts,
    }
  )

  if (postsLoading) return null

  return (
    <PageLayout>
      <div className={classnames('flex', 'my-10', 'justify-center')}>
        <div>
          <div className={classnames('py-3')}>
            <Title title='Trending Tags' />
          </div>
          <div className={classnames('flex', 'flex-wrap')}>
            {props.feedTags?.map(({ name, tid, color }) => {
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
          {feedPosts?.map((post: Post) => {
            return (
              <Fragment key={post.pid}>
                <PostCard
                  post={post}
                  author={{ name: post.name, username: post.username }}
                />
              </Fragment>
            )
          })}
        </GridLayout>
      </div>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const feedPosts = await getFeedPosts()

  const feedTags = await getFeedTags()

  return {
    props: {
      feedPosts,
      feedTags,
    },
  }
}
