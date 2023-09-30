'use client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import InscricaoService from '../services/InscricaoService.js';

export const buscarAulasPorAluno = createAsyncThunk(
  'aulas/fetchAulas',
  async (params) => {
    return await new InscricaoService().buscarAulasPorAluno(params);
  },
);

const initialState = {
  inscricoes: null,
  error: null,
};

const inscricaoSlice = createSlice({
  name: 'aulas',
  initialState,
  reducers: {
    limparErro: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buscarAulasPorAluno.fulfilled, (state, action) => {
      state.inscricoes = action.payload;
    });
    builder.addCase(buscarAulasPorAluno.rejected, (state, action) => {
      state.error = 'Erro ao carregar as aulas. Tente novamente.';
      setTimeout(() => {
        state.error = null;
      }, 2000);
    });
  },
});

export const { limparErro } = inscricaoSlice.actions;

export default inscricaoSlice.reducer;
