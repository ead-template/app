import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AlunoService from '../services/AlunoService'
import { updateAluno as updateAuthAluno } from './authReducer.jsx'

const alunoService = new AlunoService()

// Async action para atualizar os dados do aluno
export const updateAluno = createAsyncThunk(
  'aluno/updateAlunoStatus',
  async (alunoDTO, thunkAPI) => {
    try {
      const response = await alunoService.updateAluno(alunoDTO)
      if (response.status === 200) {
        thunkAPI.dispatch(updateAuthAluno(response.data))
      }
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

// Async action para trocar senha
export const changePassword = createAsyncThunk(
  'aluno/changePasswordStatus',
  async (usuarioTrocaSenhaDTO, thunkAPI) => {
    try {
      const response = await alunoService.changePassword(usuarioTrocaSenhaDTO)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const alunoSlice = createSlice({
  name: 'aluno',
  initialState: {
    alunoData: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    // Handle updateAluno async action
    [updateAluno.pending]: (state) => {
      state.status = 'loading'
    },
    [updateAluno.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.alunoData = action.payload
    },
    [updateAluno.rejected]: (state, action) => {
      state.status = 'failed'
      state.error =
        action.payload && action.payload.message
          ? action.payload.message
          : action.error.message ||
            'Ocorreu um erro ao atualizar os dados do aluno.'
    },

    // Handle changePassword async action
    [changePassword.pending]: (state) => {
      state.status = 'loading'
    },
    [changePassword.fulfilled]: (state) => {
      state.status = 'succeeded'
    },
    [changePassword.rejected]: (state, action) => {
      state.status = 'failed'
      state.error =
        action.error.message || 'Ocorreu um erro ao alterar a senha.'
    },
  },
})

export default alunoSlice.reducer
