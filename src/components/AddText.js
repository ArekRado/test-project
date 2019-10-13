import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { Input } from './Input'
import { EditorContext } from '../context'

const Well = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 160px;
`

export function AddText() {
  const [text, setText] = useState('')
  const [font, setFont] = useState('Arial')
  const [color, setColor] = useState('#000000')

  const [isBold, setBold] = useState(false)
  const [isUnderline, setUnderline] = useState(false)
  const [isItalic, setItalic] = useState(false)

  const context = useContext(EditorContext)

  return (
    <div>
      <h4>Add Text</h4>

      <Input
        placeholder='Text input'
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <Well>
        <label style={{ fontFamily: 'Arial' }}>
          <input
            type='radio'
            name='font'
            value='Arial'
            defaultChecked
            onChange={() => setFont('Arial')}
          />
          Arial
        </label>

        <label style={{ fontFamily: 'Times New Roman' }}>
          <input
            type='radio'
            name='font'
            value='Times New Roman'
            onChange={() => setFont('Times New Roman')}
          />
          Times New Roman
        </label>

        <label style={{ fontFamily: 'Open Sans' }}>
          <input
            type='radio'
            name='font'
            value='Open Sans'
            onChange={() => setFont('Open Sans')}
          />
          Open Sans
        </label>

        <label style={{ textWeight: 'bold' }}>
          <input
            type='checkbox'
            onChange={() => setBold(!isBold)}
            checked={isBold}
          />
          Bold
        </label>

        <label style={{ textDecoration: 'underline' }}>
          <input
            type='checkbox'
            onChange={() => setUnderline(!isUnderline)}
            checked={isUnderline}
          />
          Underline
        </label>

        <label style={{ fontStyle: 'italic' }}>
          <input
            type='checkbox'
            onChange={() => setItalic(!isItalic)}
            checked={isItalic}
          />
          Italic
        </label>

        <label>
          <input
            type='color'
            value={color}
            defaultChecked
            onChange={e => setColor(e.target.value)}
          />
          {color}
        </label>
      </Well>

      <Button
        disabled={text.length === 0}
        onClick={() =>
          context.actions.addText({
            text,
            font,
            isBold,
            isUnderline,
            isItalic,
            color,
          })
        }
      >
        Add text
      </Button>
    </div>
  )
}
