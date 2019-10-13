import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { EditorContext } from '../context'
import { ContextMenu } from './ContextMenu'
import html2canvas from 'html2canvas'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const Border = styled.div`
  width: 100%;
  height: 100%;
  border: 2px black dotted;
  max-height: 400px;

  background: gainsboro;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 35px,
    rgba(255, 255, 255, 0.5) 35px,
    rgba(255, 255, 255, 0.5) 70px
  );
`

const DropArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Logo = styled.img`
  width: ${params => params.size || 100}px;
  height: ${params => params.size || 100}px;

  position: absolute;
  transform: translate(${params => params.x}px, ${params => params.y}px);
`

const Text = styled.div`
  width: ${params => params.size || 100}px;
  height: ${params => params.size || 100}px;

  color: ${params => params.color};
  font-family: ${params => params.fontFamily};
  font-weight: ${params => (params.isBold ? 'bold' : 'normal')};
  text-decoration: ${params => (params.isUnderline ? 'underline' : 'none')};
  font-style: ${params => params.isItalic};

  position: absolute;
  transform: translate(${params => params.x}px, ${params => params.y}px);
`

const allowDrop = e => {
  e.preventDefault()
}

const showContextMenu = (item, setContextMenu, elementType) => e => {
  e.preventDefault()

  setContextMenu({
    isShow: true,
    elementId: item.id,
    elementType,
    position: {
      x: e.clientX,
      y: e.clientY,
    },
  })
}

const contextMenuInitialState = {
  isShow: false,
  elementId: null,
  position: { x: 0, y: 0 },
}

const drag = (elementId, elementType) => e => {
  e.dataTransfer.setData('elementType', elementType)
  e.dataTransfer.setData('elementId', elementId)
}

const downloadImage = () => {
  html2canvas(document.getElementById('editor'), { useCORS: true }).then(
    canvas => {
      document.body.appendChild(canvas)
      const imageUrl = canvas.toDataURL()

      var link = document.createElement('a')
      link.setAttribute('href', imageUrl)
      link.setAttribute('download', 'promo.jpg')
      link.setAttribute('target', '_blank')
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      canvas.remove()
    },
  )
}

const onDrop = context => e => {
  const elementId = e.dataTransfer.getData('elementId')
  const elementType = e.dataTransfer.getData('elementType')

  if (elementType === 'logo') {
    e.dataTransfer.getData('elementId')
      ? context.actions.moveLogo(e, elementId)
      : context.actions.addLogo(e, elementId)
  } else if (elementType === 'text') {
    context.actions.moveText(e, elementId)
  }
}

export function Editor() {
  const [contextMenu, setContextMenu] = useState({
    isShow: false,
    elementId: null,
    elementType: '',
    position: { x: 0, y: 0 },
  })

  const context = useContext(EditorContext)

  useEffect(
    () =>
      document.addEventListener('click', () => {
        if (!contextMenu.isShow) {
          setContextMenu(contextMenuInitialState)
        }
      }),
    [contextMenu.isShow],
  )

  return (
    <Wrapper>
      <h4>Editor</h4>

      <Border>
        <DropArea
          id='editor'
          background={context.background}
          onDragOver={allowDrop}
          onDrop={onDrop(context)}
        >
          {context.background && <Background src={context.background} />}

          {context.logos.map(logo => (
            <Logo
              data-name='logo'
              onContextMenu={showContextMenu(logo, setContextMenu, 'logo')}
              src={logo.src}
              key={logo.id}
              x={logo.position.x}
              y={logo.position.y}
              size={logo.size}
              draggable
              onDragStart={drag(logo.id, 'logo')}
            />
          ))}

          {context.texts.map(text => (
            <Text
              onContextMenu={showContextMenu(text, setContextMenu, 'text')}
              key={text.id}
              x={text.position.x}
              y={text.position.y}
              fontFamily={text.fontFamily}
              isBold={text.isBold}
              isUnderline={text.isUnderline}
              isItalic={text.isItalic}
              color={text.color}
              draggable
              onDragStart={drag(text.id, 'text')}
            >
              {text.text}
            </Text>
          ))}
        </DropArea>
      </Border>

      <ContextMenu
        isShow={contextMenu.isShow}
        position={contextMenu.position}
        onDelete={() => context.actions.deleteElement(contextMenu)}
      />
      <Button onClick={downloadImage}>Download as image</Button>
    </Wrapper>
  )
}
