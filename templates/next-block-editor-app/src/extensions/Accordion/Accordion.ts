import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import AccordionNode from './AccordionNode'

export const Accordion = Node.create({
  name: 'accordion',

  group: 'block',

  content: 'block+',

  draggable: true,

  addAttributes() {
    return {
      title: {
        default: 'Accordion Title',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="accordion"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'accordion' }, HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(AccordionNode)
  },

  addCommands() {
    return {
      setAccordion:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: 'accordion',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Accordion Content',
                  },
                ],
              },
            ],
          })
        },
    }
  },
})
