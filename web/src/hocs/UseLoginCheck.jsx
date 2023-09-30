'use client';
// hocs/withLoginCheck.js

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/AuthService';
import { login } from '@/store/authReducer.jsx';

export const useLoginCheck = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      const loggedInUser = AuthService.usuarioCorrente();
      if (loggedInUser) {
        dispatch(login(loggedInUser));
      } else {
        router.push('/login');
      }
    }
  }, [isLoggedIn, dispatch, router]);
};
