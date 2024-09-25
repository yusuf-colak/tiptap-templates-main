import { BlockEditor } from '@/components/BlockEditor'
import {
  Accordion as AccordionShadcn,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { EditorContent, NodeViewContent, NodeViewWrapper, NodeViewWrapperProps } from '@tiptap/react'
import React from 'react'
import { Doc as YDoc } from 'yjs'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useBlockEditor } from '@/hooks/useBlockEditor'
import { ContentItemMenu } from '@/components/menus'
import { useBlockEditorTest } from '@/hooks/useBlockEditorTest'

export default (props: any) => {
  const ydoc = useMemo(() => new YDoc(), [])

  const { editor, users, collabState } = useBlockEditorTest({ ydoc })

  if (!editor || !users) {
    return null
  }
  return (
    <NodeViewWrapper className="react-component">
      <AccordionShadcn type="single" collapsible>
        <AccordionItem value="item-1" className="relative">
          <AccordionTrigger iconOnOnOff={true} locked={false} active={true} className={'py-0 w-auto'}>
            {props.node.attrs.title}
          </AccordionTrigger>
          <AccordionContent className="h-auto w-[400px] bg-red-400">
            <NodeViewContent data-drag-handle />

            {/* <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
            <ContentItemMenu editor={editor} /> */}
          </AccordionContent>
        </AccordionItem>
      </AccordionShadcn>
    </NodeViewWrapper>
  )
}
