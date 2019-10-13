import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { Input } from './Input'
import { EditorContext } from '../context'
import { useDebouncedCallback } from 'use-debounce'

// const EditButton = styled(props => <Link {...props} />)`
//   background-color: #f5f03f;
//   padding: 5px 20px;
//   border-radius: 5px;
//   color: black;
//   text-decoration: none;
// `

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const BackgroundButton = styled.button`
  width: 100px;
  height: 100px;
  border: none;
  background-size: cover;
  background-image: url(${props => props.background});
`

const randomDimensions = () =>
  `${parseInt(Math.random() * 200 + 300, 10)}x${parseInt(
    Math.random() * 200 + 300,
    10,
  )}`

const fetchBackgrounds = (search, setBackgrounds) => {
  Promise.all([
    fetch(`https://source.unsplash.com/${randomDimensions()}/?${search}`),
    fetch(`https://source.unsplash.com/${randomDimensions()}/?${search}`),
    fetch(`https://source.unsplash.com/${randomDimensions()}/?${search}`),
    fetch(`https://source.unsplash.com/${randomDimensions()}/?${search}`),
  ]).then(data => {
    setBackgrounds(data.map(response => response.url))
  })
}

export function BackgroundSelect() {
  const [search, setSearch] = useState('')
  const [backgrounds, setBackgrounds] = useState([])
  const context = useContext(EditorContext)

  useEffect(() => {
    fetchBackgrounds('cat', setBackgrounds)
  }, [])

  const [debouncedCallback] = useDebouncedCallback(() => {
    fetchBackgrounds(search, setBackgrounds)
  }, 500)

  return (
    <Wrapper>
      <h4>Select Background</h4>

      <Input
        type='text'
        value={search}
        onChange={e => {
          setSearch(e.target.value)
          debouncedCallback()
        }}
        placeholder='Find image'
      />

      {backgrounds.map((background, i) => (
        <BackgroundButton
          key={`${i}${background}`}
          background={background}
          onClick={() => context.actions.setBackground(background)}
        ></BackgroundButton>
      ))}

      <Button onClick={() => context.actions.setBackground('')}>
        Delete Background
      </Button>
    </Wrapper>
  )
}
