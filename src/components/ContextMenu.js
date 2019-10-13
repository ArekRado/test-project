import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'

const Menu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: ${params => (params.isShow ? 'block' : 'none')};
  transform: translate(${params => params.x}px, ${params => params.y}px);
`

export function ContextMenu(props) {
  return (
    <Menu isShow={props.isShow} x={props.position.x} y={props.position.y}>
      <Button onClick={props.onDelete}>Delete element</Button>
    </Menu>
  )
}
