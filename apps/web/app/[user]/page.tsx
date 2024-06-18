'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function Page() {
  return (
    <div className=' bg-primary '>
      <ModeToggle />
      <Button>Wau</Button>
    </div>
  )
}
