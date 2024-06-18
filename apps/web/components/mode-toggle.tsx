'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <div>
      <Button>Hello</Button>
      <Button onClick={() => setTheme('light')}>Light</Button>
      <Button onClick={() => setTheme('dark')}>Dark</Button>
    </div>
  )
}
