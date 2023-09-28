import { OPEN_SIDEBAR_AULA, CLOSE_SIDEBAR_AULA } from './sidebarAulaActions.jsx'

const initialState = {
  visible: true,
}

const sidebarAulaReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SIDEBAR_AULA:
      return {
        ...state,
        visible: true,
      }
    case CLOSE_SIDEBAR_AULA:
      return {
        ...state,
        visible: false,
      }
    default:
      return state
  }
}

export default sidebarAulaReducer
