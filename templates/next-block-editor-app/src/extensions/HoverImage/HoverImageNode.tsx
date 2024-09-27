import React, { useCallback, useState } from 'react'
import { NodeViewWrapper, useEditorState } from '@tiptap/react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import ImageUploader from './ImageUploader'
import { Button } from '@/components/ui/Button'
import { HoverImageBlockWidth } from './HoverImageBlockWidth'
import deepEql from 'fast-deep-equal'
import { cn } from '@/lib/utils'

const HoverImageNode = ({ node, editor }) => {
  const [edit, setEdit] = useState(false)
  const { width, href, title, uuid } = node.attrs
  const [newUpdateImage, setNewUpdateImage] = useState(href)
  console.log('width', width)
  const updateImage = useCallback(
    (url: string) => {
      editor.chain().focus().updateHoverImageByUUID(uuid, { href: url }).run()
    },
    [editor, uuid],
  )

  const onWidthChange = useCallback(
    (value: number) => {
      console.log('onWidthChange', value),
        editor.chain().focus(undefined, { scrollIntoView: false }).updateHoverImageByUUID(uuid, { width: value }).run()
    },
    [editor],
  )

  return (
    <NodeViewWrapper as="div" className="hover-card-node !whitespace-pre-wrap">
      <HoverCard>
        <HoverCardTrigger className="underline decoration-2 hover:text-blue-900 cursor-zoom-in">
          {title}
        </HoverCardTrigger>
        <HoverCardContent
          style={{ width: `${width}%` }}
          sideOffset={10}
          className="bg-white/90 dark:bg-black/90 cursor-default   p-1"
        >
          {edit ? (
            <div>
              {newUpdateImage == null && <ImageUploader onUpload={imageUrl => setNewUpdateImage(imageUrl)} />}
              {newUpdateImage && (
                <div>
                  <img src={newUpdateImage} alt="Uploaded Hover Image" className="w-full h-auto " />
                  <Button
                    onClick={() => {
                      updateImage(newUpdateImage)
                      setEdit(false)
                    }}
                    className="w-full"
                  >
                    Onayla
                  </Button>
                  <Button
                    onClick={() => {
                      setEdit(false)
                      setNewUpdateImage(href)
                    }}
                    className="w-full"
                  >
                    İptal
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {editor.isEditable && (
                <div className="flex flex-col justify-between gap-2 mb-2">
                  <Button
                    onClick={() => {
                      setEdit(true)
                      setNewUpdateImage(null)
                    }}
                    className="min-w-[160px] w-full"
                  >
                    Resimi Değiştir
                  </Button>

                  <HoverImageBlockWidth onChange={onWidthChange} value={width} />
                </div>
              )}
              <img src={href} alt="Hover Image" className="h-auto" />
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </NodeViewWrapper>
  )
}

export default HoverImageNode
