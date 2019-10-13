import React, { useState } from 'react'
import styled from 'styled-components'

const Logo = styled.img`
  max-width: 60px;
  max-height: 60px;
`

const Label = styled.label`
  display: flex;
`

const logos = ['/img/logo_one.png', '/img/logo_two.png', '/img/logo_three.png']

const drag = (logo, size) => e => {
  e.dataTransfer.setData('elementType', 'logo')
  e.dataTransfer.setData(
    'data',
    JSON.stringify({
      type: 'logo',
      src: logo,
      size,
    }),
  )
}

export function AddLogo() {
  const [size, setSize] = useState(100)

  return (
    <div>
      <h4>Add Logo</h4>

      {logos.map(logo => (
        <Logo key={logo} src={logo} draggable onDragStart={drag(logo, size)} />
      ))}

      <Label>
        <span>{size}</span>
        <input
          type='range'
          value={size}
          onChange={e => setSize(parseInt(e.target.value, 10))}
          min={30}
          max={150}
        />
      </Label>
    </div>
  )
}
