import { BoringAvatar, ImageCard } from 'components'
import Link from 'next/link'
import React from 'react'
import classnames from 'tailwindcss-classnames'
import { PostType } from 'types/Post'

export const PostCard = ({ post }: { post: PostType }) => {
  return (
    <div key={post.pid}>
      <Link href={`/byte/${post.slug}`}>
        <div>
          <div className={classnames('py-2')}>
            <p className='text-2xl font-medium'>{post.title}</p>
            <div className={classnames('flex', 'justify-between', 'w-max')}>
              <div>
                <BoringAvatar name={post.name} size={30} variant='beam' />
              </div>
              <div className={classnames('mx-2')}>
                <p>By {post.name}</p>
              </div>
            </div>
          </div>
          <ImageCard src={post.images[0]} />
        </div>
      </Link>
    </div>
  )
}

export default PostCard
