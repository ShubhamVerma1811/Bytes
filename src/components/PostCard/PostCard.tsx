import { BoringAvatar, ImageCard } from 'components'
import Link from 'next/link'
import React from 'react'
import classnames from 'tailwindcss-classnames'
import { PostSchema } from 'types/Post'
import { User } from 'types/User'

export const PostCard = ({
  post,
  author,
}: {
  post: PostSchema
  author: User
}) => {
  return (
    <div key={post.pid} className={classnames('cursor-pointer')}>
      <Link href={`/byte/${post.slug}`}>
        <div>
          <div className={classnames('py-2')}>
            <p className='text-2xl font-medium hover:underline'>{post.title}</p>
            <div className={classnames('flex', 'justify-between', 'w-max')}>
              <div>
                <BoringAvatar name={author.name} size={30} variant='beam' />
              </div>
              <Link href={`/profile/${author.username}`}>
                <div
                  className={classnames(
                    'mx-2',
                    'hover:underline',
                    'cursor-pointer'
                  )}>
                  <p>By {author.name}</p>
                </div>
              </Link>
            </div>
          </div>
          <ImageCard src={post.images[0]} />
        </div>
      </Link>
    </div>
  )
}

export default PostCard
