import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AulaService from '../services/AulaService.js'

const getAlunoUUID = (state) => state.auth.user.aluno.uuid

export const buscarAulaCompleta = createAsyncThunk(
  'aula/fetchAula',
  async (uuidAula, { getState }) => {
    const uuidAluno = getAlunoUUID(getState())
    return await new AulaService().buscarAulaCompleta(uuidAula, uuidAluno)
  },
)

export const buscarAulasPorTermo = createAsyncThunk(
  'aula/buscarAulasPorTermo',
  async (params) => {
    return await new AulaService().buscarAulasPorTermo(params)
  },
)

export const marcarProgresso = createAsyncThunk(
  'aula/marcarProgresso',
  async (progressoData, { getState }) => {
    const uuidAluno = getAlunoUUID(getState())

    return await new AulaService().marcarProgresso({
      ...progressoData,
      uuidAluno,
    })
  },
)

export const desmarcarProgresso = createAsyncThunk(
  'aula/desmarcarProgresso',
  async ({ uuid, type }) => {
    await new AulaService().desmarcarProgresso(uuid)
    return { uuid, type }
  },
)

const initialState = {
  aula: null,
  aulasPorTermo: null,
  error: null,
  isLoading: false,
  searchTerm: '',
}

const aulaSlice = createSlice({
  name: 'aula',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buscarAulaCompleta.fulfilled, (state, action) => {
      state.aula = action.payload
    })
    builder.addCase(buscarAulaCompleta.rejected, (state) => {
      state.error = 'Erro ao carregar a aula. Tente novamente.'
      setTimeout(() => (state.error = ''), 1000)
    })

    builder.addCase(marcarProgresso.fulfilled, (state, action) => {
      if (action.payload.aula && !action.payload.conteudo && state.aula) {
        state.aula.progresso = action.payload
      } else if (action.payload.conteudo && action.payload.aula && state.aula) {
        const conteudoIndex = state.aula.conteudos.findIndex(
          (conteudo) => conteudo.uuid === action.payload.conteudo,
        )
        if (conteudoIndex !== -1) {
          state.aula.conteudos[conteudoIndex].progresso = action.payload
        }
      }
    })
    builder.addCase(marcarProgresso.rejected, (state, action) => {
      state.error = 'Erro ao marcar  como concluída. Tente novamente.'
    })
    builder.addCase(desmarcarProgresso.fulfilled, (state, action) => {
      if (action.payload.type === 'aula' && state.aula) {
        state.aula.progresso = null
      } else if (action.payload.type === 'conteudo' && state.aula) {
        const conteudoIndex = state.aula.conteudos.findIndex(
          (conteudo) =>
            conteudo.progresso &&
            conteudo.progresso.uuid === action.payload.uuid,
        )
        if (conteudoIndex !== -1) {
          state.aula.conteudos[conteudoIndex].progresso = null
        }
      }
    })

    builder.addCase(desmarcarProgresso.rejected, (state, action) => {
      state.error = 'Erro ao desmarcar como concluído. Tente novamente.'
    })

    builder.addCase(buscarAulasPorTermo.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(buscarAulasPorTermo.fulfilled, (state, action) => {
      state.aulasPorTermo = action.payload
      state.isLoading = false
      state.searchTerm = action.meta.arg.search // Assumindo que "search" é a chave do termo no argumento
      state.isLoading = false
    })
    builder.addCase(buscarAulasPorTermo.rejected, (state, action) => {
      state.error = 'Erro ao buscar aulas por termo. Tente novamente.'
      state.isLoading = false
    })
  },
})

export const { clearError } = aulaSlice.actions
export default aulaSlice.reducer
