import { BoringAvatar, ImageCard, Pill, Title } from "components"
import Harper from "db/harper/config"
import { GridLayout, PageLayout } from "layouts"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { Fragment } from "react"
import { classnames } from "tailwindcss-classnames"
import { PostType } from "types/Post"
import { TagType } from "types/Tag"

export default function Home({
  feedPosts,
  feedTags,
}: {
  feedPosts: Array<PostType>
  feedTags: Array<TagType>
}) {
  //#region

  // const {
  //   data: { feedPosts, feedTags },
  //   error,
  //   isLoading,
  // } = useQuery("getFeed", async () => {
  //   const harper = new Harper()
  //   const feedPosts = await harper.post({
  //     operation: "sql",
  //     sql: "SELECT p.*,u.name,u.email FROM bytes.post AS p INNER JOIN bytes.user AS u ON p.uid = u.uid",
  //   })

  //   const feedTags = await harper.post({
  //     operation: "sql",
  //     sql: "SELECT * FROM bytes.tag",
  //   })

  //   return {
  //     feedPosts,
  //     feedTags,
  //   }
  // })

  // if (isLoading) return null

  //#endregion

  return (
    <PageLayout>
      <div>
        <div className={classnames("flex", "my-10", "justify-center")}>
          <div>
            <div className={classnames("py-3")}>
              <Title title='Trending Tags' />
            </div>
            <div className={classnames("flex", "flex-wrap")}>
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
          <div className={classnames("flex", "my-5", "justify-center")}>
            <div className={classnames("py-3")}>
              <Title title='Trending Bytes' />
            </div>
          </div>

          <GridLayout>
            {/* @ts-ignore */}
            {feedPosts?.map(({ pid, title, name, images, slug }) => {
              return (
                <div key={pid}>
                  <Link href={`byte/${slug}`}>
                    <div>
                      <div className={classnames("py-2")}>
                        <p className='text-2xl font-medium'>{title}</p>
                        <div
                          className={classnames(
                            "flex",
                            "justify-between",
                            "w-max"
                          )}>
                          <div>
                            <BoringAvatar
                              name={name}
                              size={30}
                              variant='beam'
                            />
                          </div>
                          <div className={classnames("mx-2")}>
                            <p>By {name}</p>
                          </div>
                        </div>
                      </div>
                      <ImageCard src={images[0]} />
                    </div>
                  </Link>
                </div>
              )
            })}
          </GridLayout>
        </div>
      </div>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const harper = new Harper()
  const feedPosts = await harper.post({
    operation: "sql",
    sql: "SELECT p.*,u.name FROM bytes.post AS p INNER JOIN bytes.user AS u ON p.uid = u.uid",
  })

  const feedTags = await harper.post({
    operation: "sql",
    sql: "SELECT * FROM bytes.tag",
  })

  return {
    props: {
      feedPosts,
      feedTags,
    },
  }
}
