'use client';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Inicializa a partir dos cookies ou usa valores padrão
const userFromCookie = JSON.parse(Cookies.get('usuario') || '{}');
const tokenFromCookie = Cookies.get('token') ? Cookies.get('token') : null;

const initialState = {
  isLoggedIn: !!tokenFromCookie,
  user: userFromCookie || null,
  token: tokenFromCookie || null,
  aluno: tokenFromCookie ? tokenFromCookie.aluno : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('cheguei aqui');
      state.isLoggedIn = true;
      state.user = action.payload;
      state.token = action.payload.token;
      state.aluno = action.payload.aluno;
      // Salva no localStorage se disponível
      Cookies.set('token', action.payload.token);
      Cookies.set('usuario', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.aluno = null;
      Cookies.remove('token');
      Cookies.remove('usuario');
    },
    updateAluno: (state, action) => {
      state.user.aluno = action.payload;

      const updatedUser = { ...state.user, aluno: action.payload };
      // Atualiza o localStorage se disponível
      Cookies.set('usuario', JSON.stringify(updatedUser));
    },
  },
});

export const { login, logout, updateAluno } = authSlice.actions;

export default authSlice.reducer;
