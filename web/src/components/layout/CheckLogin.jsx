// hooks/useCheckLogin.js

import { useSelector, useDispatch } from 'react-redux';
import AuthService from '../../services/AuthService.js';
import { login } from '../../store/authReducer.jsx';

export const useCheckLogin = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    const loggedInUser = AuthService.usuarioCorrente();
    if (loggedInUser) {
      dispatch(login(loggedInUser));
      return true;
    }
    return false;
  }

  return isLoggedIn;
};
