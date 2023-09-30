'use client';
import { useEffect } from 'react';
import Hotjar from '@hotjar/browser';

const InitServices = () => {
  useEffect(() => {
    const initHotjar = () => {
      try {
        const siteId = 3638341;
        const hotjarVersion = 6;
        Hotjar.init(siteId, hotjarVersion);
      } catch (error) {
        console.error('Failed to initialize Hotjar:', error);
      }
    };

    initHotjar();
  }, []);

  return null; // Este componente não renderiza nada
};

export default InitServices;
