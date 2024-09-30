import {
  Accordion as AccordionShadcn,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { EditorContent, NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'


export default ({node, editor}: any) => {
  return (
    <NodeViewWrapper className="react-component">
      <AccordionShadcn type="single" collapsible>
        <AccordionItem value="item-1" className="relative">
          <AccordionTrigger iconOnOnOff={true} locked={false} active={true}>
            {node.attrs.title}
          </AccordionTrigger>
          <AccordionContent className={cn(
              "h-auto",
              editor.isEditable ? "border border-dashed border-gray-300" : ""
          )}>
            <NodeViewContent data-drag-handle />
          </AccordionContent>
        </AccordionItem>
      </AccordionShadcn>
    </NodeViewWrapper>
  )
}
