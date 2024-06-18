'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { Tldraw } from 'tldraw'

export default function Home() {
  return (
    <main className='w-screen h-screen'>
      <div className='absolute z-10 bottom-4 left-3'>
        <Button>asd</Button>
      </div>
      <div className='fixed inset-0'>
        <Tldraw />
      </div>
    </main>
  )
}
