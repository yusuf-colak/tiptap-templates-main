import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import HoverImageNode from './HoverImageNode' // Your custom React component for hover card

export const HoverImage = Node.create({
  name: 'hoverImage', // Node name

  group: 'inline', // Define as inline so it behaves like text

  content: 'inline*', // Accept inline content

  inline: true, // Ensure it behaves inline

  draggable: false, // Not draggable in this case

  addAttributes() {
    return {
      href: {
        default: '#', // Default link href
      },
      title: {
        default: '', // Default title attribute
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
    return ReactNodeViewRenderer(HoverImageNode) // Use the custom React component
  },

  addCommands() {
    return {
      setHoverImage:
        attributes =>
        ({ commands, editor }) => {
          const { selection } = editor.state
          const selectedText = editor.state.doc.textBetween(selection.from, selection.to) // Get the selected text

          // Insert the hover card with the selected text as the title attribute
          return commands.insertContent({
            type: 'hoverImage',
            attrs: {
              ...attributes,
              title: selectedText || 'Hover Card Title', // Use the selected text as the title
            },
            content: [], // No need for additional content since title is already set
          })
        },
    }
  },
})
