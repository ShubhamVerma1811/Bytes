import { BoringAvatar, ImageCard, Pill } from "components"
import Harper from "db/harper/config"
import { GridLayout, PageLayout } from "layouts"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import Link from "next/link"
import React, { Fragment } from "react"
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai"
import { classnames } from "tailwindcss-classnames"
import type { PostType } from "types/Post"
import type { TagType } from "types/Tag"

const postID = ({ post, tags }: { post: PostType; tags: Array<TagType> }) => {
  return (
    <PageLayout>
      <div>
        <div>
          <div className={classnames("flex", "items-center")}>
            <p className={classnames("text-3xl", "font-medium")}>
              {post.title}
            </p>
            <div className={classnames("mr-0", "ml-auto")}>
              <p className={classnames("text-2xl")}>🔥</p>
              <p>0</p>
            </div>
          </div>
          <div className={classnames("flex", "justify-between", "w-max")}>
            <div>
              {/* @ts-ignore */}
              <BoringAvatar name={post.name} size={30} variant='beam' />
            </div>
            <div className={classnames("mx-2")}>
              {/* @ts-ignore */}
              <p>By {post.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classnames("flex", "flex-wrap")}>
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
      <div className={classnames("flex", "justify-center")}>
        <p className={classnames("inline", "text-xl")}>
          Share On
          <span>
            <AiOutlineTwitter
              color='#1da1f2'
              size={30}
              className={classnames("inline")}
            />
          </span>
          <span>
            <AiFillLinkedin
              color='#007ab6'
              size={30}
              className={classnames("inline")}
            />
          </span>
          <span>
            <AiFillFacebook
              color='#1778f2'
              size={30}
              className={classnames("inline")}
            />
          </span>
        </p>
      </div>
    </PageLayout>
  )
}

export default postID

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { pslug } = query

  const harper = new Harper()

  const post = await harper.post({
    operation: "sql",
    sql: `SELECT p.*,u.name FROM bytes.post AS p INNER JOIN bytes.user AS u ON u.uid=p.uid WHERE p.slug='${pslug}'`,
  })

  const tags = await harper.post({
    operation: "sql",
    sql: `SELECT t.* FROM bytes.post_tag AS pt INNER JOIN bytes.tag AS t ON pt.tid=t.tid WHERE pt.pid='${post[0]?.pid}'`,
  })

  return {
    props: {
      post: post[0],
      tags,
    },
  }
}
