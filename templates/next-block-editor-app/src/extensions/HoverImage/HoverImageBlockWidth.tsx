import { memo, useCallback, useEffect, useState } from 'react'

export type HoverImageBlockWidthProps = {
  onChange: (value: number) => void
  value: number
}

export const HoverImageBlockWidth = memo(({ onChange, value }: HoverImageBlockWidthProps) => {
  const [initalValue, setInıtalValue] = useState(value)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
    
      const nextValue = parseInt(e.target.value)
      onChange(nextValue)
      setInıtalValue(nextValue)
    },
    [onChange],
  )

  return (
    <div className="flex items-center gap-2">
      <input
        className="h-2 bg-neutral-200 border-0 rounded appearance-none fill-neutral-300"
        type="range"
        min="25"
        max="100"
        step="25"
        onChange={handleChange}
        value={initalValue}
      />
      <span className="text-xs font-semibold text-neutral-500 select-none">{initalValue}%</span>
    </div>
  )
})

HoverImageBlockWidth.displayName = 'HoverImageBlockWidth'
