import { NotFound, Pill, PostCard } from 'components'
import { GridLayout, PageLayout } from 'layouts'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getTagPosts } from 'services/tags'
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
  if (results === null)
    return <NotFound message={message} title='404 Not Found' />
  if (!posts.length)
    return (
      <NotFound
        message={'Not Posts for this tag'}
        title={`${tag.name.toUpperCase()} | Bytes`}
      />
    )

  return (
    <PageLayout>
      <Head>
        <title>{tag.name.toUpperCase()} | Bytes</title>
      </Head>
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

  return await getTagPosts(tname as string)
}
