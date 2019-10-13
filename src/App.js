import React, { useReducer } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { BackgroundSelect } from './components/BackgroundSelect'
import { Editor } from './components/Editor'
import { Sidebar } from './components/Sidebar'
import { EditorContext, actions, reducer } from './context'

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: center;
  }
`

const MainLayout = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  width: 100%;
  height: 100%;
  max-width: 1200px;

  display: grid;
  grid-template: 550px / 200px 400px 200px;
  grid-gap: 20px;
`

const initialState = {
  backgrond: '',
  logos: [],
  texts: [],
  savedState: {},
  previousStates: [],
}

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <React.Fragment>
      <GlobalStyles />
      <MainLayout>
        <EditorContext.Provider
          value={{
            ...state,
            actions: actions(dispatch, state),
          }}
        >
          <BackgroundSelect />
          <Editor />

          <Sidebar />
        </EditorContext.Provider>
      </MainLayout>
    </React.Fragment>
  )
}
