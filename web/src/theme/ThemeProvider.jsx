"use client"
// ThemeProvider.js

import React, { useState, useEffect } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './themes'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie';


export const ThemeContext = React.createContext()

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Esta parte só será executada no lado cliente
    const storedTheme = Cookies.get('theme') || 'dark';
    setTheme(storedTheme)

    const linkElement = document.getElementById('theme-css')
    if (linkElement) {
      linkElement.href = `/assets/css/theme-${storedTheme}.css`
    }
  }, [])

  const toggleTheme = (newTheme) => {
    console.log(newTheme)
    const themeToSet = newTheme || (theme === 'dark' ? 'light' : 'dark')
    setTheme(themeToSet)
    Cookies.set('theme', themeToSet, { expires: 365 });

    const linkElement = document.getElementById('theme-css')
    if (linkElement) {
      linkElement.href = `/assets/css/theme-${themeToSet}.css`
    }
  }

  useEffect(() => {
    const linkElement = document.getElementById('theme-css')
    if (linkElement) {
      linkElement.href = `/assets/css/theme-${theme}.css`
    }
  }, [theme])

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeProvider
