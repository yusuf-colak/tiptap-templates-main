import React, { useCallback, useState } from 'react'
import { NodeViewWrapper } from '@tiptap/react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import ImageUploader from './ImageUploader'
import { Button } from '@/components/ui/Button'

const HoverImageNode = ({ node, editor }) => {
  const [edit, setEdit] = useState(false) 
  const { href, title, uuid } = node.attrs
  const [newUpdateImage, setNewUpdateImage] = useState(href) 

  const updateImage = useCallback(
    (url: string) => {
      editor.chain().focus().updateHoverImageByUUID(uuid, { href: url }).run()
    },
    [editor, uuid],
  )

  return (
    <NodeViewWrapper as="div" className="hover-card-node !whitespace-pre-wrap">
      <HoverCard>
        <HoverCardTrigger className="underline decoration-2 hover:text-blue-900 cursor-zoom-in">
          {title}
        </HoverCardTrigger>
        <HoverCardContent sideOffset={10} className="bg-slate-300/50 cursor-default">
          {edit ? (
            <div>
              {newUpdateImage == null && <ImageUploader onUpload={imageUrl => setNewUpdateImage(imageUrl)} />}
              {newUpdateImage && (
                <div>
                  <img src={newUpdateImage} alt="Uploaded Hover Image" className="w-full h-auto p-3" />
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
              <img src={href} alt="Hover Image" className="w-full h-auto p-3" />
              {editor.isEditable ? (
                <div className="flex justify-between mt-2">
                  <Button
                    onClick={() => {
                      setEdit(true) 
                      setNewUpdateImage(null)
                    }}
                    className="w-full"
                  >
                    Değiştir
                  </Button>
                </div>
              ) : null}
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </NodeViewWrapper>
  )
}

export default HoverImageNode
