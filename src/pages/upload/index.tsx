import { ImageCard, TagsInput } from "components"
import firebase from "db/firebase/config"
import Harper from "db/harper/config"
import useRequireLogin from "hooks/useRequireLogin"
import { GridLayout, PageLayout } from "layouts"
import { useRouter } from "next/router"
import React, { useRef, useState } from "react"
import { generate as shortID } from "shortid"
import slugify from "slugify"
import { classnames } from "tailwindcss-classnames"
import { PostType } from "types/Post"
import { Post_Tag_Type } from "types/Post_Tag"
import { TagType } from "types/Tag"
import { v4 as uuid } from "uuid"

export type PostProps = {
  pid?: string
  images: Array<string>
  slug?: string
  title: string
  uid: string
}

const harper = new Harper()

const upload = () => {
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState<Array<TagType>>([])

  const router = useRouter()

  const inpBtnRef = useRef(null)

  const { user, loading } = useRequireLogin({ to: "/upload" })

  if (loading || !user.isLoggedIn) return null

  const handleImageUploadAndRender = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages((prev) => [...prev, e.target.result])
      }
      setFiles((prev) => [...prev, e.target.files[0]])
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleImageUploadToFirebase = async (e) => {
    try {
      e.preventDefault()
      const pid = uuid()
      const images = []

      const storageRef = firebase.storage().ref()
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        const task = await storageRef.child(`${pid}/${file.name}`).put(file)
        const link = await storageRef
          .child(`${pid}/${file.name}`)
          .getDownloadURL()
        images.push(link)
      }

      const post: PostType = {
        pid,
        title,
        images,
        slug: slugify(title + shortID()),
        uid: user.uid,
      }

      const dbRes = await harper.post({
        operation: "insert",
        schema: "bytes",
        table: "post",
        records: [
          {
            ...post,
          },
        ],
      })

      const post_tag: Array<Post_Tag_Type> = []

      for (const i in tags) {
        const tag = tags[i]

        post_tag.push({
          pid,
          tid: tag.tid,
        })
      }

      const dbPost_Tag = await harper.post({
        operation: "insert",
        schema: "bytes",
        table: "post_tag",
        records: [...post_tag],
      })

      router.push(`/byte/${post.slug}`)
    } catch (err) {
      console.error(err)
    }
  }

  const handleTagsChange = (tags) => {
    setTags(tags)
  }

  return (
    <PageLayout>
      <div className={classnames("max-w-4xl", "mx-auto", "mt-10")}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            id='title'
            type='text'
            className={classnames(
              "text-3xl",
              "md:text-5xl",
              "border-b",
              "outline-none"
            )}
            value={title}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </form>

        <div className={classnames("border-b", "outline-none")}>
          <TagsInput handleTagsChange={handleTagsChange} tags={tags} />
        </div>

        <GridLayout>
          <React.Fragment>
            {images.map((image, idx) => {
              return (
                <div key={idx}>
                  <ImageCard src={image} />
                </div>
              )
            })}
            <div
              className='rounded-md bg-blue-50 w-64 border'
              onClick={() => inpBtnRef.current.click()}>
              <div className='flex justify-center items-center h-auto w-64'>
                <h1 className='text-5xl'>+</h1>
                <input
                  type='file'
                  name='imaeg'
                  id='image'
                  ref={inpBtnRef}
                  onChange={handleImageUploadAndRender}
                  hidden
                />
              </div>
            </div>
          </React.Fragment>
        </GridLayout>
        <form onSubmit={handleImageUploadToFirebase}>
          <button type='submit'>Upload</button>
        </form>
      </div>
    </PageLayout>
  )
}

export default upload
