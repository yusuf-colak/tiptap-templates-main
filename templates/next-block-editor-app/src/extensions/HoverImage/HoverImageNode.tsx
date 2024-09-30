import React from 'react'
import { NodeViewWrapper } from '@tiptap/react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'

const HoverImageNode = ({ node }) => {
  const { href, title } = node.attrs
  return (
    <NodeViewWrapper as="div" className="hover-card-node !whitespace-pre-wrap ">
      <HoverCard>
        <HoverCardTrigger className="underline decoration-2 hover:text-blue-900 cursor-zoom-in">
          {title}
        </HoverCardTrigger>
        <HoverCardContent sideOffset={10} className="  bg-slate-300/50 cursor-default">
          <img src={href} alt="Hover Image" className="w-full h-auto p-3" />
        </HoverCardContent>
      </HoverCard>
    </NodeViewWrapper>
  )
}

export default HoverImageNode
