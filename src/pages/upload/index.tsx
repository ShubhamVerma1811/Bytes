import { ImageCard, Modal, TagsInput } from 'components'
import firebase from 'db/firebase/config'
import Harper from 'db/harper/config'
import useRequireLogin from 'hooks/useRequireLogin'
import { GridLayout, PageLayout } from 'layouts'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { Fragment, useRef, useState } from 'react'
import { generate as shortID } from 'shortid'
import slugify from 'slugify'
import { classnames } from 'tailwindcss-classnames'
import { PostType } from 'types/Post'
import { Post_Tag_Type } from 'types/Post_Tag'
import { TagType } from 'types/Tag'
import { v4 as uuid } from 'uuid'

export type PostProps = {
  pid?: string
  images: Array<string>
  slug?: string
  title: string
  uid: string
}

const harper = new Harper()

const UploadPage = () => {
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<Array<TagType>>([])
  const [showModal, setShowModal] = useState(false)
  const [progressMessage, setProgressMessage] = useState('')

  const router = useRouter()

  const inpBtnRef = useRef(null)

  const { user, loading } = useRequireLogin({ to: '/upload' })

  //@ts-ignore
  if (loading || !user.isLoggedIn) return null

  function validateFile(file: File) {
    const allowedExtension = ['png', 'jpeg', 'jpg', 'webp']
    const fileExtension = file.type.split('/').pop().toLowerCase()

    let isValidFile = false

    for (const index in allowedExtension) {
      if (fileExtension === allowedExtension[index]) {
        isValidFile = true
        break
      }
    }

    if (!isValidFile) {
      alert('Allowed Extensions are : *.' + allowedExtension.join(', *.'))
    }

    return isValidFile
  }

  const handleImageUploadAndRender = (e) => {
    const file = e.target.files[0]
    if (file) {
      validateFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages((prev) => [...prev, e.target.result])
      }
      setFiles((prev) => [...prev, file])
      reader.readAsDataURL(file)
    }
  }

  const createPostOnHarper = async (post) => {
    try {
      const dbPostRes = await harper.post({
        operation: 'insert',
        schema: 'bytes',
        table: 'post',
        records: [
          {
            ...post,
          },
        ],
      })
      return dbPostRes
    } catch (err) {
      console.error(err)
    }
  }

  const createPostTagOnHarper = async (post_tag) => {
    try {
      const dbPostTagRes = await harper.post({
        operation: 'insert',
        schema: 'bytes',
        table: 'post_tag',
        records: [...post_tag],
      })
      return dbPostTagRes
    } catch (err) {
      console.error(err)
    }
  }

  const createPost = async (e) => {
    try {
      e.preventDefault()
      setShowModal(true)
      const pid = uuid()
      const images = []

      setProgressMessage('Uploading Images to Firebase...')
      const storageRef = firebase.storage().ref()
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        const task = await storageRef.child(`${pid}/${file.name}`).put(file)
        const link = await storageRef
          .child(`${pid}/${file.name}`)
          .getDownloadURL()
        images.push(link)
      }
      setProgressMessage('Images to Firebase Uploaded!!')

      const post: PostType = {
        pid,
        title,
        images,
        name: user.name,
        reactions: 0,
        slug: slugify(`${title}-${shortID()}`),
        uid: user.uid,
      }

      setProgressMessage('Creating Post on Harper...')

      await createPostOnHarper(post)

      setProgressMessage('Post Created on Harper!')

      const post_tag: Array<Post_Tag_Type> = []

      for (const i in tags) {
        const tag = tags[i]

        post_tag.push({
          pid,
          tid: tag.tid,
        })
      }

      setProgressMessage('Creating Post_Tag Relationship on Harper...')

      await createPostTagOnHarper(post_tag)

      setProgressMessage('Post Creating Complete! Redirecting you to the post!')

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
      <div>
        <Head>
          <title>Upload | Bytes</title>
        </Head>
      </div>
      {showModal && <Modal progressMessage={progressMessage} />}
      <div className={classnames('max-w-4xl', 'mx-auto', 'mt-10')}>
        <div className='my-4'>
          <p className={classnames('font-bold', 'text-red-500')}>
            To avoid spam for the sake of the demo. User is limited to 4 images
            a post.
          </p>
        </div>

        <form onSubmit={createPost} id='main-form'>
          <input
            id='title'
            type='text'
            className={classnames(
              'text-3xl',
              'md:text-5xl',
              'border-b',
              'outline-none',
              'w-full',
              'bg-transparent'
            )}
            value={title}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </form>

        <div className={classnames('my-3', 'border-b', 'outline-none')}>
          <TagsInput handleTagsChange={handleTagsChange} tags={tags} />
        </div>

        <div className={classnames('flex', 'justify-between', 'items-center')}>
          <div className={classnames('my-3')}>
            {images.length ? (
              <button
                form='main-form'
                value='submit'
                className={classnames(
                  'px-3',
                  'py-2',
                  'border-2',
                  'border-blue-500',
                  'text-blue-500',
                  'font-bold',
                  'hover:bg-blue-500',
                  'hover:text-white'
                )}
                type='submit'>
                Upload
              </button>
            ) : null}
          </div>

          {images.length < 4 && (
            <div
              className={classnames('my-3')}
              onClick={() => inpBtnRef.current.click()}>
              <button
                className={classnames(
                  'px-3',
                  'py-2',
                  'border-2',
                  'border-green-500',
                  'text-green-500',
                  'font-bold',
                  'hover:bg-green-500',
                  'hover:text-white'
                )}
                type='submit'>
                Add Image
              </button>
            </div>
          )}
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
          </React.Fragment>
        </GridLayout>
        <Fragment>
          <input
            type='file'
            name='image'
            accept='.png,.jpeg,.jpg,.webp'
            id='image'
            ref={inpBtnRef}
            onChange={handleImageUploadAndRender}
            hidden
          />
        </Fragment>
      </div>
    </PageLayout>
  )
}

export default UploadPage
