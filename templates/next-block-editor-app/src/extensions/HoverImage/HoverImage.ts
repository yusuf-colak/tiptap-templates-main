import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import HoverImageNode from './HoverImageNode' // Your custom React component for hover card
import { v4 as uuidv4 } from 'uuid' // UUID üretmek için

export const HoverImage = Node.create({
  name: 'hoverImage', // Node name

  group: 'inline', // Define as inline so it behaves like text

  content: 'inline*', // Accept inline content

  inline: true, // Ensure it behaves inline

  draggable: false, // Not draggable in this case

  addAttributes() {
    return {
      href: {
        default: '#', // Default link href (image URL)
      },
      title: {
        default: '', // Default title attribute
      },
      uuid: {
        default: null, // UUID attribute, initially null, but will be set when created
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="hoverImage"]', // HTML tag used for the hover card
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(
        {
          'data-type': 'hoverImage',
        },
        HTMLAttributes,
      ),
      0,
    ] // Render as span with inline-block style
  },

  addNodeView() {
    return ReactNodeViewRenderer(HoverImageNode)
  },

  addCommands() {
    return {
      setHoverImage:
        attributes =>
        ({ state, commands, dispatch }) => {
          const { selection } = state
          const selectedText = state.doc.textBetween(selection.from, selection.to)

          const { nodeBefore } = selection.$from

          // Eğer zaten seçili bir hoverImage node varsa ve aynı UUID'ye sahipse, güncelleme yap
          if (nodeBefore?.type.name === 'hoverImage' && nodeBefore.attrs.uuid === attributes.uuid) {
            return commands.updateAttributes('hoverImage', {
              href: attributes.href,
              title: selectedText || 'Hover Card Title',
            })
          }

          // Yeni bir hoverImage node ekle, UUID'yi oluştur ve ata
          const newUuid = uuidv4()

          return commands.insertContent({
            type: 'hoverImage',
            attrs: {
              ...attributes,
              title: selectedText || 'Hover Card Title',
              uuid: newUuid, // Yeni UUID ekleniyor
            },
            content: [],
          })
        },

      updateHoverImageByUUID:
        (uuid, attributes) =>
        ({ state, commands }) => {
          const { tr } = state
          let updated = false

          // Belgedeki tüm düğümleri dolaşarak UUID'yi eşleştir ve güncelle
          state.doc.descendants((node, pos) => {
            if (node.type.name === 'hoverImage' && node.attrs.uuid === uuid) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                ...attributes,
              })
              updated = true
            }
          })

          if (updated) {
            commands.setMeta('addToHistory', false)
            return tr
          }
          return false
        },
    }
  },
})
