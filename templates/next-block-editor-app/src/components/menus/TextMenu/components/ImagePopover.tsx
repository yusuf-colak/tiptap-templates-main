import { ImagePopoverPanel } from '@/components/panels'
import { Icon } from '@/components/ui/Icon'
import { Toolbar } from '@/components/ui/Toolbar'
import * as Popover from '@radix-ui/react-popover'

export type EditLinkPopoverProps = {
  onHoverLink: (link: string) => void
}

export const ImagePopover = ({ onHoverLink }: EditLinkPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button tooltip="Hover Image">
          <Icon name="Image" />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content>
        <ImagePopoverPanel onHoverLink={onHoverLink} />
      </Popover.Content>
    </Popover.Root>
  )
}
