import { Pill } from 'components'
import Harper from 'db/harper/config'
import debounce from 'lodash.debounce'
import React, { useCallback, useRef, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { classnames, TArg } from 'tailwindcss-classnames'
import { TagType } from 'types/Tag'

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
    searchInpRef.current.click()
  }

  const removeTags = (index: number) => {
    handleTagsChange(tags.filter((tag) => tags.indexOf(tag) !== index))
  }

  const debouncedGetTagInfo = useCallback(
    debounce(async (tag) => {
      const tags: TagType[] = await harper.post({
        operation: 'sql',
        sql: `SELECT * FROM bytes.tag AS t WHERE t.name LIKE '%${tag}%'`,
      })
      // @ts-ignore
      setSuggestedTags(tags.filter((lcTag) => lcTag.tid !== suggestedTags.tid))
      return tags
    }, 500),
    []
  )

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
        <input
          type='text'
          value={tag}
          ref={searchInpRef}
          className={classnames('outline-none', 'w-full')}
          placeholder='Search and Enter Tags'
          onChange={handleTagAndSearchTag}
          required
        />
      </div>
      {suggestedTags.map((tag) => {
        return (
          <div
            key={tag.tid}
            onClick={() => addTags(tag)}
            className={classnames(
              'border-2',
              'bg-gray-100',
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
