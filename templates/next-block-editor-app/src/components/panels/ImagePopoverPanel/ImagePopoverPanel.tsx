import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Surface } from '@/components/ui/Surface'
import { useState, useCallback, useMemo } from 'react'

export type ImagePopoverPanelProps = {
  initialUrl?: string
  initialOpenInNewTab?: boolean
  onHoverLink: (url: string) => void
}

export const useImagePopoverState = ({ initialUrl, initialOpenInNewTab, onHoverLink }: ImagePopoverPanelProps) => {
  const [url, setUrl] = useState(initialUrl || '')
  const [openInNewTab, setOpenInNewTab] = useState(initialOpenInNewTab || false)

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }, [])

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (isValidUrl) {
        onHoverLink(url)
      }
    },
    [url, isValidUrl, openInNewTab, onHoverLink],
  )

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    handleSubmit,
    isValidUrl,
  }
}

export const ImagePopoverPanel = ({ onHoverLink, initialOpenInNewTab, initialUrl }: ImagePopoverPanelProps) => {
  const state = useImagePopoverState({ onHoverLink, initialOpenInNewTab, initialUrl })

  return (
    <Surface className="p-2">
      <form onSubmit={state.handleSubmit} className="flex items-center gap-2">
        <label className="flex items-center gap-2 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 cursor-text">
          <Icon name="Link" className="flex-none text-black dark:text-white" />
          <input
            type="url"
            className="flex-1 bg-transparent outline-none min-w-[12rem] text-black text-sm dark:text-white"
            placeholder="Enter URL"
            value={state.url}
            onChange={state.onChange}
          />
        </label>
        <Button variant="primary" buttonSize="small" type="submit" disabled={!state.isValidUrl}>
          Set Image
        </Button>
      </form>
      <div className="mt-3">
        <img src={state.url} alt={'title'} />
      </div>
    </Surface>
  )
}
