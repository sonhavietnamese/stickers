import React from 'react'
import { useEditor } from 'tldraw'

export default function Inside() {
  const editor = useEditor()

  editor.setCurrentTool('draw')

  return <div>inside</div>
}
