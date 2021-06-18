import { Pill } from 'components'
import Harper from 'db/harper/config'
import React, { useRef, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { classnames, TArg } from 'tailwindcss-classnames'
import { TagType } from 'types/Tag'
import { useDebouncedCallback } from 'use-debounce'

const harper = new Harper()

export const TagsInput = ({
  handleTagsChange,
  tags,
}: {
  handleTagsChange: any
  tags: Array<TagType>
}) => {
  const [tag, setTag] = useState('')
  const [suggestedTags, setSuggestedTags] = useState<Array<TagType>>([])

  const searchInpRef = useRef(null)

  const addTags = (tag: TagType) => {
    handleTagsChange((prev) => [...prev, { ...tag }])
    setTag('')
    setSuggestedTags([])
    searchInpRef.current.focus()
  }

  const removeTags = (index: number) => {
    searchInpRef.current.focus()
    handleTagsChange(tags.filter((tag) => tags.indexOf(tag) !== index))
  }

  const debouncedGetTagInfo = useDebouncedCallback(async (tag) => {
    const dbTags: TagType[] = await harper.post({
      operation: 'sql',
      sql: `SELECT * FROM bytes.tag AS t WHERE t.name LIKE '%${tag}%' AND t.name NOT IN (${tags
        .map((t) => t.name)
        .map((v) => `'${v}'`)
        .join(',')})`,
    })

    setSuggestedTags([...dbTags])
    return dbTags
  }, 500)

  const handleTagAndSearchTag = (e) => {
    setTag(e.target.value)
    debouncedGetTagInfo(e.target.value)
  }

  return (
    <div>
      <div
        className={classnames(
          'flex',
          'items-center',
          'overflow-auto',
          'flex-wrap',
          'scrollbar-thin' as TArg
        )}>
        {tags.map((tag, idx) => {
          return (
            <div key={idx}>
              <Pill name={tag.name} color={tag.color} curve>
                <span
                  className={classnames('ml-2')}
                  onClick={() => removeTags(idx)}>
                  <AiFillCloseCircle />
                </span>
              </Pill>
            </div>
          )
        })}
        {tags.length < 4 && (
          <input
            type='text'
            value={tag}
            ref={searchInpRef}
            className={classnames('outline-none', 'w-full', 'bg-transparent')}
            placeholder='Enter upto 4 tags'
            onChange={handleTagAndSearchTag}
            required
          />
        )}
      </div>
      {suggestedTags.map((tag) => {
        return (
          <div
            key={tag.tid}
            onClick={() => addTags(tag)}
            className={classnames(
              'bg-gray-100',
              'dark:bg-gray-800' as TArg,
              'dark:text-white' as TArg,
              'dark:hover:bg-gray-600' as TArg,
              'hover:bg-gray-300',
              'px-1',
              'py-2',
              'cursor-pointer'
            )}>
            <p className={classnames('uppercase', 'text-lg')}>{tag.name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default TagsInput
