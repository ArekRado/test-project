import React from 'react'

export const EditorContext = React.createContext({})

export const reducer = (state, action) => {
  let newState = state
  switch (action.type) {
    case 'setBackground':
      newState = { ...state, background: action.payload }
      break

    case 'addLogo':
      newState = { ...state, logos: [...state.logos, action.payload] }
      break

    case 'addText':
      newState = { ...state, texts: [...state.texts, action.payload] }
      break

    case 'removeLogo':
      newState = {
        ...state,
        logos: state.logos.filter(logo => logo.id !== action.payload.elementId),
      }
      break

    case 'removeText':
      newState = {
        ...state,
        texts: state.texts.filter(text => text.id !== action.payload.elementId),
      }
      break

    case 'moveLogo':
      newState = {
        ...state,
        logos: state.logos.map(logo =>
          logo.id === action.payload.id
            ? { ...logo, position: action.payload.position }
            : logo,
        ),
      }
      break

    case 'moveText':
      newState = {
        ...state,
        texts: state.texts.map(text =>
          text.id === action.payload.id
            ? { ...text, position: action.payload.position }
            : text,
        ),
      }
      break

    case 'saveState':
      newState = {
        ...state,
        savedState: state,
      }
      break

    case 'loadState':
      newState = state.savedState
      break

    case 'undoChanges':
      if (state.previousStates.length > 0) {
        newState = {
          ...state.previousStates[state.previousStates.length - 1],
          previousStates: state.previousStates.slice(0, -1),
        }
      }
      break

    default:
      break
  }

  // Undo data
  if (
    newState !== state &&
    action.type !== 'saveState' &&
    action.type !== 'loadState' &&
    action.type !== 'undoChanges'
  ) {
    newState = {
      ...newState,
      previousStates: [...newState.previousStates, state],
    }
  }

  return newState
}

const minMax = (min, max, value) =>
  Math.min(Math.max(parseInt(value), min), max)

export const actions = (dispatch, state) => ({
  setBackground: payload =>
    dispatch({
      type: 'setBackground',
      payload,
    }),
  deleteElement: payload => {
    if (payload.elementType === 'logo') {
      dispatch({
        type: 'removeLogo',
        payload,
      })
    } else if (payload.elementType === 'text') {
      dispatch({
        type: 'removeText',
        payload,
      })
    }
  },
  addLogo: e => {
    const data = JSON.parse(e.dataTransfer.getData('data'))
    const layerPosition = e.currentTarget.getBoundingClientRect()
    const size = data.size || 100

    const position = {
      x: e.clientX - layerPosition.x - size / 2,
      y: e.clientY - layerPosition.y - size / 2,
    }

    dispatch({
      type: 'addLogo',
      payload: {
        ...data,
        id: `${Math.random()}`,
        position: {
          x: minMax(0, 400 - size, position.x),
          y: minMax(0, 400 - size, position.y),
        },
      },
    })
  },
  moveLogo: (e, id) => {
    const logo = state.logos.find(logo => logo.id === id)
    const layerPosition = e.currentTarget.getBoundingClientRect()
    const size = logo.size || 100

    const position = {
      x: e.clientX - layerPosition.x - size / 2,
      y: e.clientY - layerPosition.y - size / 2,
    }

    dispatch({
      type: 'moveLogo',
      payload: {
        id,
        position: {
          x: minMax(0, 400 - size, position.x),
          y: minMax(0, 400 - size, position.y),
        },
      },
    })
  },
  addText: data =>
    dispatch({
      type: 'addText',
      payload: {
        ...data,
        id: `${Math.random()}`,
        position: {
          x: 200,
          y: 200,
        },
      },
    }),

  moveText: (e, id) => {
    const layerPosition = e.currentTarget.getBoundingClientRect()

    const position = {
      x: e.clientX - layerPosition.x,
      y: e.clientY - layerPosition.y,
    }

    dispatch({
      type: 'moveText',
      payload: {
        id,
        position: {
          x: minMax(0, 350, position.x),
          y: minMax(0, 350, position.y),
        },
      },
    })
  },
  saveState: () =>
    dispatch({
      type: 'saveState',
    }),
  loadState: () =>
    dispatch({
      type: 'loadState',
    }),
  undoChanges: () =>
    dispatch({
      type: 'undoChanges',
    }),
})
