import {
  Accordion as AccordionShadcn,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef } from 'react'
import {cn} from "@/lib/utils";

export default props => {
  const contentRef = useRef(null)

  const handleTitleChange = e => {
    const newTitle = e.target.value
    props.updateAttributes({ title: newTitle })
  }

  const handleContentChange = () => {
    if (contentRef.current) {
      const newText = contentRef.current.innerHTML
      props.updateAttributes({ text: newText })
    }
  }

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = props.node.attrs.text || ''
    }
  }, [props.node.attrs.text])

  return (
    <NodeViewWrapper className="react-component">
      <AccordionShadcn type="single" collapsible>
        <AccordionItem value="item-1" className="relative">
          <AccordionTrigger iconOnOnOff={true} locked={false} active={true} className={'py-0 w-auto'}>
            {props.editor.isEditable ? (
              <input
                type="text"
                className=" focus-visible:border-none focus-visible:border-0  w-full !bg-transparent"
                value={props.node.attrs.title}
                onChange={handleTitleChange}
              />
            ) : (
              <div className="w-full text-start ">{props.node.attrs.title}</div>
            )}
          </AccordionTrigger>
          <AccordionContent className={cn(
            "h-auto",
            props.editor.isEditable ? "border border-dashed border-gray-300" : ""
          )}>
            <NodeViewContent
              ref={contentRef}
              contentEditable={props.editor.isEditable ? true : false}
              suppressContentEditableWarning={true}
              onInput={handleContentChange}
              data-drag-handle
            />
          </AccordionContent>
        </AccordionItem>
      </AccordionShadcn>
    </NodeViewWrapper>
  )
}
