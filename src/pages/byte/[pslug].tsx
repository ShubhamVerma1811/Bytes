import { BoringAvatar, ImageCard, NotFound, Pill } from 'components'
import Harper from 'db/harper/config'
import humanFormat from 'human-format'
import { GridLayout, PageLayout } from 'layouts'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineTwitter,
} from 'react-icons/ai'
import { getPost, updatePostReaction } from 'services/posts'
import { classnames } from 'tailwindcss-classnames'
import type { PostType } from 'types/Post'
import type { TagType } from 'types/Tag'
import { useDebouncedCallback } from 'use-debounce'

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

  const [reactions] = useState(post.reactions)
  const [count, setCount] = useState(0)
  const [active, setActive] = useState(false)

  const debouncedReactionSave = useDebouncedCallback(async () => {
    updatePostReaction(post.slug, count)
    setActive(false)
  }, 800)

  const handleReactions = () => {
    setCount((prev) => prev + 1)
    setActive(true)
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
                'px-2',
                'cursor-pointer',
                'select-none'
              )}
              onClick={handleReactions}>
              <div
                className={classnames(
                  'flex',
                  'flex-col',
                  'justify-center',
                  'items-center'
                )}>
                <p className={classnames('text-xl')}>🔥</p>
                <p>
                  {humanFormat(reactions + count, {
                    unit: 'B',
                  })}
                </p>
                <p
                  className={classnames(
                    'text-xs',
                    classnames(active ? 'block' : 'hidden')
                  )}>
                  + {count} bytes added
                </p>
              </div>
            </div>
          </div>
          <div className={classnames('flex', 'justify-between', 'w-max')}>
            <div>
              <BoringAvatar name={post.name} size={30} variant='beam' />
            </div>
            <div className={classnames('mx-2')}>
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
              href={`http://twitter.com/share?text=Checkout out this Bytes by ${post.name} on ${post.title}&url=https://bytes.vercel.app/${router.asPath}`}
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
