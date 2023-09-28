import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from './sidebarActions'

const initialState = {
  visible: false,
}

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        ...state,
        visible: true,
      }
    case CLOSE_SIDEBAR:
      return {
        ...state,
        visible: false,
      }
    default:
      return state
  }
}

export default sidebarReducer
