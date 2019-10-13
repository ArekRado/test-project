import React, { useContext } from 'react'
import styled from 'styled-components'
import { AddLogo } from './AddLogo'
import { AddText } from './AddText'
import { Button } from './Button'
import { EditorContext } from '../context'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export function Sidebar() {
  const context = useContext(EditorContext)

  return (
    <Wrapper>
      <div>
        <AddLogo />
        <AddText />
      </div>

      <div>
        <Button onClick={context.actions.saveState}>Save</Button>
        <Button onClick={context.actions.loadState}>Load</Button>
      </div>
      <Button onClick={context.actions.undoChanges}>Undo changes</Button>
    </Wrapper>
  )
}
