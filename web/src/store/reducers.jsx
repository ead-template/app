// reducers.js
import { combineReducers } from 'redux'
import authReducer from './authReducer.jsx'
import inscricaoSlice from './inscricaoSlice.jsx'
import aulaSlice from './AulaSlice.jsx'
import alunoSlice from './alunoSlice.jsx'
import sidebarReducer from './sidebar/sidebarReducer.jsx'
import sidebarAulaReducer from './aula/sidebarAulaReducer.jsx'
import feedbackSlice from './feedback/feedbackSlice.jsx'

const rootReducer = combineReducers({
  auth: authReducer,
  inscricao: inscricaoSlice,
  aula: aulaSlice,
  aluno: alunoSlice,
  sidebar: sidebarReducer,
  sidebarAula: sidebarAulaReducer,
  feedback: feedbackSlice,
})

export default rootReducer
