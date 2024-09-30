import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Surface } from '@/components/ui/Surface'
import React, { useState, useCallback } from 'react'
import ImageUploader from './ImageUploader' // Import the uploader

export type ImagePopoverPanelProps = {
  initialUrl?: string
  onHoverLink: (url: string | undefined) => void // Adjusted to allow undefined for cancel case
}

export const useImagePopoverState = ({ initialUrl, onHoverLink }: ImagePopoverPanelProps) => {
  const [url, setUrl] = useState(initialUrl || '')

  const handleUpload = useCallback((uploadedUrl: string) => {
    setUrl(uploadedUrl)
  }, [])

  return {
    url,
    setUrl,
    handleUpload,
  }
}

export const ImagePopoverPanel = ({ onHoverLink, initialUrl }: ImagePopoverPanelProps) => {
  const state = useImagePopoverState({ onHoverLink, initialUrl })

  return (
    <Surface className="p-2">
      {state.url ? (
        <React.Fragment>
          <img src={state.url} alt={'Uploaded Image'} className="w-[300px]" />
          <div className="mt-3 flex gap-2">
            <Button
              className="w-full"
              onClick={() => {
                onHoverLink(state.url)
              }}
            >
              Bestätigen
            </Button>
            <Button
              onClick={() => {
                state.setUrl('')
              }}
              className="w-full "
            >
              Abbrechen
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <ImageUploader onUpload={state.handleUpload} />
      )}
    </Surface>
  )
}
