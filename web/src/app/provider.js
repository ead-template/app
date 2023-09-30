// provider.js
'use client';
import { Provider } from 'react-redux';
import store from '../store/store';
import InitServices from '@/app/InitServices';
import ThemeProvider from '@/theme/ThemeProvider';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Render a component that provides context and services to its children.
 *
 * @param {Object} children - The children components to be rendered.
 * @return {JSX.Element} The rendered component.
 */
export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <InitServices />
        {children}
      </ThemeProvider>
    </Provider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
