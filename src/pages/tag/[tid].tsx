import { ImageCard, Pill } from "components"
import Harper from "db/harper/config"
import { GridLayout, PageLayout } from "layouts"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { PostType } from "types/Post"
import { TagType } from "types/Tag"

const tagID = ({ posts, tag }: { posts: Array<PostType>; tag: TagType }) => {
  const router = useRouter()

  return (
    <PageLayout>
      <div>
        <h1>
          Posts with the tag :
          <Pill name={tag.name} color={tag.color} />
        </h1>
      </div>
      <GridLayout>
        {posts?.map(({ images, pid, slug }) => (
          <div key={pid}>
            <Link href={`/byte/${slug}`}>
              <div>{<ImageCard src={images[0]} />}</div>
            </Link>
          </div>
        ))}
      </GridLayout>
    </PageLayout>
  )
}

export default tagID

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { tid: tname } = query

  const harper = new Harper()

  const tag = await harper.post({
    operation: "sql",
    sql: `SELECT * FROM bytes.tag AS t WHERE t.name='${tname
      .toString()
      .toLowerCase()}'`,
  })

  const posts = await harper.post({
    operation: "sql",
    sql: `SELECT p.* FROM bytes.post_tag AS pt INNER JOIN bytes.post AS p ON pt.pid=p.pid WHERE pt.tid='${tag[0].tid}'`,
  })

  return {
    props: {
      posts,
      tag: tag[0],
    },
  }
}
