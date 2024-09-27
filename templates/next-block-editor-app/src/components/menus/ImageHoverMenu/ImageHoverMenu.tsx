import React, { useCallback, useState } from 'react'
import deepEql from 'fast-deep-equal'
import { BubbleMenu as BaseBubbleMenu, useEditorState } from '@tiptap/react'

import { MenuProps } from '../types'
import { ImagePopoverPanel } from '@/components/panels/ImagePopoverPanel'
import { ImagePreviewPanel } from '@/components/panels/ImagePreviewPanel'

export const ImageHoverMenu = ({ editor, appendTo }: MenuProps): JSX.Element => {
  const [showEdit, setShowEdit] = useState(false)
  const { href } = useEditorState({
    editor,
    selector: ctx => {
      // console.log('ctx.editor.getAttributes()', ctx.editor.getAttributes('hoverImage'))
      const attrs = ctx.editor.getAttributes('hoverImage')
      return { href: attrs.href }
    },
    equalityFn: deepEql,
  })

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive('href')
    return isActive
  }, [editor])

  const handleEdit = useCallback(() => {
    setShowEdit(true)
  }, [])

  const onHoverLink = useCallback(
    (url: string) => {
      editor.chain().focus().extendMarkRange('hoverImage').setHoverImage({ href: url }).run()
      setShowEdit(false)
    },

    [editor],
  )

  const onUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange('hoverImage').unsetLink().run()
    setShowEdit(false)
    return null
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="hoverImage"
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        appendTo: () => {
          return appendTo?.current
        },
        onHidden: () => {
          setShowEdit(false)
        },
      }}
    >
      {showEdit ? (
        // <ImagePopoverPanel initialUrl={href} onHoverLink={onHoverLink} />
      ) : (
        <ImagePreviewPanel url={href} onClear={onUnsetLink} onEdit={handleEdit} />
      )}
    </BaseBubbleMenu>
  )
}

export default ImageHoverMenu
