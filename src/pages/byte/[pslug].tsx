import { BoringAvatar, ImageCard, NotFound, Pill } from 'components'
import Harper from 'db/harper/config'
import humanFormat from 'human-format'
import { GridLayout, PageLayout } from 'layouts'
import debounce from 'lodash.debounce'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useCallback, useState } from 'react'
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineTwitter,
} from 'react-icons/ai'
import { getPost } from 'services/posts'
import { classnames } from 'tailwindcss-classnames'
import type { PostType } from 'types/Post'
import type { TagType } from 'types/Tag'

const harper = new Harper()

const PostSlugPage = ({
  post,
  tags,
  results,
  message,
}: {
  post: PostType
  tags: Array<TagType>
  results: [] | null
  message: string
}) => {
  if (!results) return <NotFound message={message} />
  const router = useRouter()

  const [reactions, setReactions] = useState(post.reactions)

  const debouncedReactionSave = useCallback(
    debounce(async () => {
      await harper.post({
        operation: 'update',
        schema: 'bytes',
        table: 'post',
        records: [
          {
            pid: post.pid,
            reactions,
          },
        ],
      })
      console.log(reactions)
    }, 1000),
    []
  )

  const handleReactions = () => {
    setReactions((prev) => prev + 1)
    debouncedReactionSave()
  }

  return (
    <PageLayout>
      <Head>
        <title>
          {post.title} by {post.name}| Bytes
        </title>
        <meta property='og:image' content={post.images[0]} />
      </Head>
      <div>
        <div>
          <div className={classnames('flex', 'items-center')}>
            <p className={classnames('text-3xl', 'font-medium')}>
              {post.title}
            </p>
            <div
              className={classnames(
                'mr-0',
                'ml-auto',
                'border',
                'border-gray-200',
                'px-2',
                'cursor-pointer'
              )}
              onClick={() => handleReactions()}>
              <p className={classnames('text-2xl')}>🔥</p>
              <p>
                {humanFormat(reactions, {
                  unit: 'B',
                })}
              </p>
            </div>
          </div>
          <div className={classnames('flex', 'justify-between', 'w-max')}>
            <div>
              {/* @ts-ignore */}
              <BoringAvatar name={post.name} size={30} variant='beam' />
            </div>
            <div className={classnames('mx-2')}>
              {/* @ts-ignore */}
              <p>By {post.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classnames('flex', 'flex-wrap')}>
        {tags?.map(({ name, tid, color }) => {
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
      <GridLayout>
        {post.images.map((src, idx) => (
          <div key={idx}>
            <ImageCard src={src} />
          </div>
        ))}
      </GridLayout>
      <div className={classnames('flex', 'justify-center', 'my-6')}>
        <p className={classnames('inline', 'text-xl')}>
          Share On
          <span>
            <a
              href={`http://twitter.com/share?text=${post.title}&url=https://bytes.vercel.app/${router.asPath}&hashtags=stackoverflow,example,youssefusf`}
              target='_blank'
              rel='noopener noreferrer'>
              <AiOutlineTwitter
                color='#1da1f2'
                size={30}
                className={classnames('inline')}
              />
            </a>
          </span>
          <span>
            <a
              href={`https://www.linkedin.com/cws/share?url=https://bytes.vercel.app/${router.asPath}`}
              target='_blank'
              rel='noopener noreferrer'>
              <AiFillLinkedin
                color='#007ab6'
                size={30}
                className={classnames('inline')}
              />
            </a>
          </span>
          <span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://bytes.vercel.app/${router.asPath}`}
              target='_blank'
              rel='noopener noreferrer'>
              <AiFillFacebook
                color='#1778f2'
                size={30}
                className={classnames('inline')}
              />
            </a>
          </span>
        </p>
      </div>
    </PageLayout>
  )
}

export default PostSlugPage

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { pslug } = query

  return await getPost(pslug as string)
}
